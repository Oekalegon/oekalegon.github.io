// Bortle scale data
const bortleData = [
  { class: 1, brightness: [21.7, 22.0], description: "Excellent dark-sky site" },
  { class: 2, brightness: [21.5, 21.7], description: "Typical truly dark site" },
  { class: 3, brightness: [21.3, 21.5], description: "Rural sky" },
  { class: 4, brightness: [20.4, 21.3], description: "Rural/suburban transition" },
  { class: 5, brightness: [19.1, 20.4], description: "Suburban sky" },
  { class: 6, brightness: [18.0, 19.1], description: "Bright suburban sky" },
  { class: 7, brightness: [17.0, 18.0], description: "Suburban/urban transition" },
  { class: 8, brightness: [16.0, 17.0], description: "City sky" },
  { class: 9, brightness: [15.0, 16.0], description: "Inner-city sky" }
];

function calculateFlux(magnitude) {
  // log10(F) = (14.863 - m) / 2.5
  return Math.pow(10, (14.863 - magnitude) / 2.5);
}

function togglePixelInputMethod() {
  const methodRadio = document.querySelector('input[name="pixel-input-method"]:checked');
  if (!methodRadio) return;
  
  const method = methodRadio.value;
  const pixelSizeInputs = document.getElementById('pixel-size-inputs');
  const sensorDimInputs = document.getElementById('sensor-dim-inputs');
  
  if (method === 'size') {
    if (pixelSizeInputs) pixelSizeInputs.style.display = 'grid';
    if (sensorDimInputs) sensorDimInputs.style.display = 'none';
  } else {
    if (pixelSizeInputs) pixelSizeInputs.style.display = 'none';
    if (sensorDimInputs) sensorDimInputs.style.display = 'grid';
  }
}

function calculateLightPollution() {
  console.log('calculateLightPollution called');
  
  // Get input values
  const aperture = parseFloat(document.getElementById('aperture').value); // mm
  const focalLength = parseFloat(document.getElementById('focal-length').value); // mm
  const qe = parseFloat(document.getElementById('quantum-efficiency').value);
  
  // Get pixel sizes based on input method
  const method = document.querySelector('input[name="pixel-input-method"]:checked').value;
  let pixelSizeWidth, pixelSizeHeight; // μm
  
  if (method === 'size') {
    const pixelSize = parseFloat(document.getElementById('pixel-size').value);
    
    if (isNaN(pixelSize) || pixelSize <= 0) {
      alert('Please enter a valid pixel size value');
      return;
    }
    
    // Assume square pixels (same in width and height)
    pixelSizeWidth = pixelSize;
    pixelSizeHeight = pixelSize;
  } else {
    // Calculate from sensor dimensions
    const sensorWidth = parseFloat(document.getElementById('sensor-width').value); // mm
    const sensorHeight = parseFloat(document.getElementById('sensor-height').value); // mm
    const pixelsWidth = parseFloat(document.getElementById('pixels-width').value);
    const pixelsHeight = parseFloat(document.getElementById('pixels-height').value);
    
    if (isNaN(sensorWidth) || sensorWidth <= 0) {
      alert('Please enter a valid sensor width');
      return;
    }
    if (isNaN(sensorHeight) || sensorHeight <= 0) {
      alert('Please enter a valid sensor height');
      return;
    }
    if (isNaN(pixelsWidth) || pixelsWidth <= 0) {
      alert('Please enter a valid number of pixels in width');
      return;
    }
    if (isNaN(pixelsHeight) || pixelsHeight <= 0) {
      alert('Please enter a valid number of pixels in height');
      return;
    }
    
    // Calculate pixel sizes in both directions (convert mm to μm)
    pixelSizeWidth = (sensorWidth / pixelsWidth) * 1000; // μm
    pixelSizeHeight = (sensorHeight / pixelsHeight) * 1000; // μm
  }
  
  console.log('Input values:', { aperture, focalLength, pixelSizeWidth, pixelSizeHeight, qe });
  
  // Validate inputs
  if (isNaN(aperture) || aperture <= 0) {
    alert('Please enter a valid aperture value');
    return;
  }
  if (isNaN(focalLength) || focalLength <= 0) {
    alert('Please enter a valid focal length value');
    return;
  }
  if (isNaN(qe) || qe < 0 || qe > 1) {
    alert('Please enter a valid quantum efficiency value (0-1)');
    return;
  }
  
  // Calculate collecting area (cm²)
  const radiusCm = (aperture / 2) / 10; // Convert mm to cm, then get radius
  const collectingArea = Math.PI * radiusCm * radiusCm; // cm²
  
  // Calculate pixel scales in both directions (arcsec/pixel)
  // pixel_scale = 206.265 * pixel_size_um / focal_length_mm
  // (206.265 accounts for unit conversion: 206265 arcsec/radian, but pixel_size is in μm and focal_length in mm)
  const pixelScaleWidth = 206.265 * pixelSizeWidth / focalLength; // arcsec/pixel
  const pixelScaleHeight = 206.265 * pixelSizeHeight / focalLength; // arcsec/pixel
  
  // Calculate pixel solid angle (arcsec²) as product of both scales
  const pixelSolidAngle = pixelScaleWidth * pixelScaleHeight; // arcsec²
  
  console.log('Calculated:', { collectingArea, pixelScaleWidth, pixelScaleHeight, pixelSolidAngle });
  
  // Display calculated parameters
  const collectingAreaEl = document.getElementById('collecting-area');
  const pixelScaleWidthEl = document.getElementById('pixel-scale-width');
  const pixelScaleHeightEl = document.getElementById('pixel-scale-height');
  const pixelSolidAngleEl = document.getElementById('pixel-solid-angle');
  
  if (collectingAreaEl) collectingAreaEl.textContent = collectingArea.toFixed(1);
  if (pixelScaleWidthEl) pixelScaleWidthEl.textContent = pixelScaleWidth.toFixed(2);
  if (pixelScaleHeightEl) pixelScaleHeightEl.textContent = pixelScaleHeight.toFixed(2);
  if (pixelSolidAngleEl) pixelSolidAngleEl.textContent = pixelSolidAngle.toFixed(2);
  
  // Calculate and display results for each Bortle class
  const tbody = document.getElementById('results-tbody');
  if (!tbody) {
    console.error('results-tbody not found');
    return;
  }
  
  tbody.innerHTML = '';
  
  bortleData.forEach(bortle => {
    const [mMin, mMax] = bortle.brightness;
    const fluxMin = calculateFlux(mMax); // Higher magnitude = darker = less flux
    const fluxMax = calculateFlux(mMin); // Lower magnitude = brighter = more flux
    
    // Photons per second per pixel = flux * collecting_area * pixel_solid_angle * QE
    const photonsMin = fluxMin * collectingArea * pixelSolidAngle * qe;
    const photonsMax = fluxMax * collectingArea * pixelSolidAngle * qe;
    
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #ddd';
    row.innerHTML = `
      <td style="padding: 10px; border: 1px solid #ddd;">
        <strong>Class ${bortle.class}</strong><br>
        <small style="color: #666;">${bortle.description}</small>
      </td>
      <td style="padding: 10px; border: 1px solid #ddd;">${mMin.toFixed(1)}–${mMax.toFixed(1)}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${fluxMin.toFixed(4)}–${fluxMax.toFixed(4)}</td>
      <td style="padding: 10px; border: 1px solid #ddd;"><strong>${photonsMin.toFixed(2)}–${photonsMax.toFixed(2)}</strong></td>
    `;
    tbody.appendChild(row);
  });
  
  // Show results
  const resultsDiv = document.getElementById('results');
  if (resultsDiv) {
    resultsDiv.style.display = 'block';
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.error('results div not found');
  }
}

// Set up event listeners - try multiple methods to ensure it works
function initCalculator() {
  console.log('Initializing calculator');
  
  // Set up pixel input method toggle
  togglePixelInputMethod();
  
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    console.log('Calculate button found');
    // Remove any existing listeners and add new one
    calculateBtn.onclick = function(e) {
      e.preventDefault();
      calculateLightPollution();
      return false;
    };
    calculateBtn.addEventListener('click', function(e) {
      e.preventDefault();
      calculateLightPollution();
      return false;
    });
  } else {
    console.error('Calculate button not found');
  }
  
  // Also calculate on Enter key in input fields
  const inputs = document.querySelectorAll('#lp-calculator input');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        calculateLightPollution();
      }
    });
  });
  
  // Calculate on page load with default values
  setTimeout(function() {
    calculateLightPollution();
  }, 100);
}

// Try multiple ways to ensure the script runs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalculator);
} else {
  // DOM is already loaded
  initCalculator();
}

// Also try window.onload as a fallback
window.addEventListener('load', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    console.log('Window loaded, button exists');
    if (!calculateBtn.onclick) {
      initCalculator();
    }
  }
});

