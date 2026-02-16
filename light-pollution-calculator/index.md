---
layout: page
title: Light Pollution Calculator
usemathjax: true
---

Calculate the light pollution signal for your specific telescope and camera setup. This calculator uses the Bortle scale to estimate the number of photons per second per pixel from light pollution.

<div style="border: 1px solid #ccc; padding: 20px; margin: 20px 0; border-radius: 5px;">
  <h2 style="margin-top: 0;">Telescope and Camera Parameters</h2>
  <form id="lp-calculator" onsubmit="return false;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
      <div>
        <label for="aperture" style="display: block; margin-bottom: 5px; font-weight: bold;">Telescope Aperture (mm):</label>
        <input type="number" id="aperture" value="204" min="1" step="0.1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
      </div>
      <div>
        <label for="focal-length" style="display: block; margin-bottom: 5px; font-weight: bold;">Focal Length (mm):</label>
        <input type="number" id="focal-length" value="1000" min="1" step="1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
      </div>
    </div>
    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 10px; font-weight: bold;">Pixel Size Input Method:</label>
      <div style="display: flex; gap: 20px;">
        <label style="display: flex; align-items: center; cursor: pointer;">
          <input type="radio" name="pixel-input-method" value="size" checked onchange="togglePixelInputMethod()" style="margin-right: 5px;">
          Direct pixel size
        </label>
        <label style="display: flex; align-items: center; cursor: pointer;">
          <input type="radio" name="pixel-input-method" value="sensor" onchange="togglePixelInputMethod()" style="margin-right: 5px;">
          Sensor dimensions
        </label>
      </div>
    </div>
    
    <div id="pixel-size-inputs" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
      <div>
        <label for="pixel-size" style="display: block; margin-bottom: 5px; font-weight: bold;">Pixel Size (μm):</label>
        <input type="number" id="pixel-size" value="3.8" min="0.1" step="0.1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
        <small style="color: #666;">Assumed square (same in width and height)</small>
      </div>
      <div style="grid-column: 2;"></div>
    </div>
    
    <div id="sensor-dim-inputs" style="display: none; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
      <div>
        <label for="sensor-width" style="display: block; margin-bottom: 5px; font-weight: bold;">Sensor Width (mm):</label>
        <input type="number" id="sensor-width" value="" min="0.1" step="0.1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
      </div>
      <div>
        <label for="sensor-height" style="display: block; margin-bottom: 5px; font-weight: bold;">Sensor Height (mm):</label>
        <input type="number" id="sensor-height" value="" min="0.1" step="0.1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
      </div>
      <div>
        <label for="pixels-width" style="display: block; margin-bottom: 5px; font-weight: bold;">Pixels (Width):</label>
        <input type="number" id="pixels-width" value="" min="1" step="1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
      </div>
      <div>
        <label for="pixels-height" style="display: block; margin-bottom: 5px; font-weight: bold;">Pixels (Height):</label>
        <input type="number" id="pixels-height" value="" min="1" step="1" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
      <div>
        <label for="quantum-efficiency" style="display: block; margin-bottom: 5px; font-weight: bold;">Quantum Efficiency (0-1):</label>
        <input type="number" id="quantum-efficiency" value="0.75" min="0" max="1" step="0.01" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
      </div>
      <div></div>
    </div>
  </form>
  <button type="button" id="calculate-btn" onclick="calculateLightPollution(); return false;" style="padding: 12px 24px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">Calculate</button>
  
  <div id="results" style="margin-top: 30px; display: none;">
    <h2>Calculated Parameters</h2>
    <div style="padding: 15px; border-radius: 5px; margin-bottom: 20px;">
      <p><strong>Collecting Area:</strong> <span id="collecting-area"></span> $\mathrm{cm}^2$</p>
      <p><strong>Pixel Scale (Width):</strong> <span id="pixel-scale-width"></span> $\mathrm{arcsec}/\mathrm{pixel}$</p>
      <p><strong>Pixel Scale (Height):</strong> <span id="pixel-scale-height"></span> $\mathrm{arcsec}/\mathrm{pixel}$</p>
      <p><strong>Pixel Solid Angle:</strong> <span id="pixel-solid-angle"></span> $\mathrm{arcsec}^2$</p>
    </div>
    
    <h2 style="margin-top: 20px;">Light Pollution Signal per Pixel</h2>
    <div style="overflow-x: auto;">
      <table id="results-table" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #333; color: white;">
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;" rowspan="2">Bortle Class</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Sky Brightness</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Flux $F$</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Signal from light polution $s_{lp}$</th>
          </tr>
          <tr style="background-color: #333; color: white;">
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">$\mathrm{mag}/\mathrm{arcsec}^2$</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">$\gamma\ \mathrm{s}^{-1}\ \mathrm{cm}^{-2}\ \mathrm{arcsec}^{-2}$</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">$\mathrm{e}^{-}/\mathrm{s}$</th>
          </tr>
        </thead>
        <tbody id="results-tbody">
        </tbody>
      </table>
    </div>
  </div>
</div>

<div style="margin-top: 30px; padding: 15px; border-radius: 5px;">
  <h3>How it works</h3>
  <p>The calculator uses the following formulas:</p>
  <ul>
    <li><strong>Collecting Area:</strong> $A = \pi \left(\frac{D}{2}\right)^2$ in $\mathrm{cm}^2$, where $D$ is the aperture diameter</li>
    <li><strong>Pixel Scale:</strong> $\theta = 206.265 \times \frac{p_{\mu\mathrm{m}}}{f_{\mathrm{mm}}}$ in $\mathrm{arcsec}/\mathrm{pixel}$, where $p_{\mu\mathrm{m}}$ is pixel size in micrometers and $f_{\mathrm{mm}}$ is focal length in millimeters</li>
    <li><strong>Pixel Solid Angle:</strong> $\Omega = \theta^2$ in $\mathrm{arcsec}^2$</li>
    <li><strong>Flux:</strong> $F = 10^{\frac{14.863 - m}{2.5}}$ where $m$ is sky brightness magnitude in $\mathrm{mag}/\mathrm{arcsec}^2$</li>
    <li><strong>Photons per pixel:</strong> $N = F \times A \times \Omega \times \mathrm{QE}$ in $\mathrm{e}^{-}/\mathrm{s}$, where QE is the quantum efficiency</li>
  </ul>
  <p>The flux calculation is based on the V-band magnitude system with a zero point from Bessel (1979).</p>
</div>

<script src="/assets/js/light-pollution-calculator.js"></script>

