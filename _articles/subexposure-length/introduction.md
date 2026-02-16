---
layout: article
title: "Signal and Noise: Introduction"
series: "Exposure time and Stacking in Astrophotography"
series_order: 1
categories: astrophotography exposure subexposures noise read-noise shot-noise gain light-pollution full-well-depth ccd cmos
published: true
usemathjax: true
---

In digital astrophotography, instead of taking one long exposure, we often stack many subexposures together to get at our final exposure.

To calculate the signal to noise ratio we need to have an expression for the signal that we capture and for the noise.
The signal, however, does not consist wholy of the photons we recieve from the nebulae, stars, and galaxies we are imaging. It also
contains, unfortunately, photons that are due to light polution and also signal due to the temperature of the sensor, the thermal signal.

Let us denote the signal we are interested in as the target (astronomical) signal $S_a$, the signal due to light polution as $S_{lp}$ and the thermal 
signal as $S_T$.

1. **Astronomical signal ($S_a$):** This is the signal we actually want to capture, the photons arriving from the celestial objects we are imaging, 
such as stars, nebulae, galaxies, or other deep-sky objects. This signal is typically very faint and accumulates slowly over time. The astronomical 
signal rate $s_a$ (i.e. the number of photons that are detected) depends on factors such as the brightness of the target, the aperture and focal length 
of the telescope, the quantum efficiency of the sensor, and atmospheric conditions.

2. **Light pollution signal ($S_{lp}$):** Light pollution refers to unwanted photons from artificial lighting sources (streetlights, city glow, etc.) 
that scatter in the atmosphere and enter the telescope. This is an unwanted background signal that adds to our total signal but doesn't contribute 
useful information about our astronomical target. The light pollution signal rate $s_{lp}$ depends on the level of light pollution at the imaging 
location, the altitude of the target above the horizon, and atmospheric conditions. In heavily light-polluted areas, this can be a significant 
component of the total signal.

Light pollution is commonly measured using the Bortle scale, which ranges from 1 (excellent dark-sky site) to 9 (inner-city sky). The relative 
photon count from light pollution approximately doubles with each step up the scale. If we take a dark Bortle 1 sky as having a photon flux
$N_0 \approx 1\ \mathrm{photon\ s^{-1}\ cm^{-2}\ arcsec^{-2}}$, then typical photon fluxes for each class are approximately:

| Bortle Scale | Description | Sky Brightness  | Approx. $N_\gamma$ | $s_{lp,\mathrm{pix}}$ (204mm, 1"/pix) |
|              |             | $\mathrm{mag} \cdot \mathrm{arcsec}^{-2}$ | $\mathrm{s}^{-1} \cdot \mathrm{cm}^{-2} \cdot \mathrm{arcsec}^{-2}$ | $\mathrm{e}^{-}/\mathrm{s}$ per pixel |
|--------------|-------------|------------------------------|------------------------------------------------|--------------------------------------|
| 1 | Excellent dark-sky site | ~21.7–22.0 | ~1 | ~250 |
| 2 | Typical truly dark site | ~21.5–21.7 | ~2 | ~500 |
| 3 | Rural sky | ~21.3–21.5 | ~4 | ~1,000 |
| 4 | Rural/suburban transition | ~20.4–21.3 | ~8 | ~2,000 |
| 5 | Suburban sky | ~19.1–20.4 | ~16 | ~4,000 |
| 6 | Bright suburban sky | ~18.0–19.1 | ~32 | ~8,000 |
| 7 | Suburban/urban transition | ~17.0–18.0 | ~64 | ~16,000 |
| 8 | City sky | ~16.0–17.0 | ~128 | ~31,000 |
| 9 | Inner-city sky | ~15.0–16.0 | ~256 | ~63,000 |

Note that these are approximate values and can vary significantly based on local conditions, weather, and the specific location within each category.

To connect the sky brightness in magnitudes to an approximate photon flux per square arcsecond, we can use the standard astronomical relation
between magnitude and flux. For a V-band sky of $\mu_0 \approx 21.7\,\mathrm{mag/arcsec^2}$ (a good Bortle 1 site), the photon flux is roughly
$N_0 \approx 1\ \mathrm{photon\ s^{-1}\ cm^{-2}\ arcsec^{-2}}$. For a sky of brightness $\mu$ (in $\mathrm{mag/arcsec^2}$), the photon flux can then be
estimated as:

$
N_\gamma(\mu) \approx N_0 \times 10^{-0.4(\mu - \mu_0)} \quad [\mathrm{photons\ s^{-1}\ cm^{-2}\ arcsec^{-2}}].
$

For example, at $\mu \approx 18.0\,\mathrm{mag/arcsec^2}$ (roughly Bortle 6), this gives $N_\gamma \approx 15 N_0 \approx 15\ \mathrm{photons\ s^{-1}\ cm^{-2}\ arcsec^{-2}}$,
so the sky background delivers about fifteen times more photons per square arcsecond than at a dark Bortle 1 site.

To convert this to actual photons per pixel per second for a specific telescope and camera setup, we multiply by the telescope's collecting area and the pixel solid angle. 
For a Newton telescope with a 204 mm aperture and a camera with approximately 1 arcsec per pixel:

- **Collecting area**: $A = \pi (D/2)^2 = \pi (10.2\,\mathrm{cm})^2 \approx 327\,\mathrm{cm^2}$
- **Pixel solid angle**: $\Omega_\mathrm{pix} = 1\,\mathrm{arcsec^2}$ (since 1 arcsec per pixel gives 1 arcsec² per pixel)
- **Quantum efficiency**: Assuming a typical CMOS sensor with QE $\approx 0.75$ (75% of photons are detected)

The light pollution signal rate per pixel is then:

$$
s_{lp,\mathrm{pix}} = N_\gamma \times A \times \Omega_\mathrm{pix} \times \mathrm{QE} \approx N_\gamma \times 327 \times 0.75 \approx N_\gamma \times 245 \quad [\mathrm{e}^{-}/\mathrm{s}]
$$

For example, at a Bortle 1 site ($N_\gamma \approx 1$), this gives approximately **245 e⁻/s per pixel** from light pollution alone. At a Bortle 6 site ($N_\gamma \approx 32$), 
this increases to approximately **7,800 e⁻/s per pixel**. This illustrates why light pollution can quickly dominate the signal in urban imaging conditions.

3. **Thermal signal ($S_T$):** Also known as dark current, this is the signal generated by the sensor itself due to thermal energy. Even in complete 
darkness, electrons are thermally excited and accumulate in the sensor pixels over time. The thermal signal rate $s_T$ increases exponentially with 
sensor temperature, making sensor cooling (via air cooling, Peltier cooling, or liquid nitrogen) crucial for long exposures. This thermal signal 
can be measured and subtracted using dark frames—exposures taken with the same duration and temperature as the light frames, but with the telescope 
or camera lens covered. By subtracting dark frames from light frames during image processing, we can remove most of the thermal signal contribution.

The signal we capture with our sensor $S$ is thus:

$$
S = S_a + S_{lp} + S_{T}
$$

The unit of $S$ is usually $\mathrm{e}^{-}$

If we use $s = \frac{dS}{dt}$ to denote the signal per unit of time (in $\mathrm{e}^{-}/\mathrm{s}$), we get:

$$
s = \left(s_a +s_{lp} + s_{T}\right)
$$

The value of the total signal in the image is then:

$$
S = \left(s_a +s_{lp} + s_{T}\right) t
$$

where $t$ is the exposure time.

To get to the signal to noise ratio, we, of course, also need to calculate the noise.

There are three different types of noise relevant in astrophotography:

1. Shot noise. This is the noise inherent in the signal that we recieve from the sky (both from the astronomical target and the light polution). 
The photons do not arrive in a regulated constant train, but arive randomly. Sometimes a bit more, sometimes a bit less. This is the noise. The 
value of shot noise is equal to the square root of the signal from the target and the light polution, $N_s = \sqrt{S_a + S_{lp}}$.
2. Thermal noise. This is the noise in the thermal signal that originates from the CCD or CMOS sensor. It is the random variation in the thermal
signal. As with the shot noise, this is equal to the square root of the thermal signal, $N_T = \sqrt{S_T}$
3. Read noise. This is the noise that is due to the electronics in the camera when reading the data from the sensor. It is only introduced when 
reading the camera data. It depends on the sensor and the camera electronics and the gain at which you use the camera.

To calculate total noise we cannot simply add the noise from the different sources together. Noise is uncertain and sometimes the noise in one
pixel will mean that less signal is recieved, and sometimes more. We need to add the square of each noise value and take the square root over the 
sum: --> Poisson distribution

$$
N = \sqrt{ N_s^2 + N_T^2 + N_r^2}
$$

To determine the effect of noise for each exposure we need to know how noise accumulates over time. For shot noise and thermal noise, 
which follow Poisson statistics, the variance accumulates linearly with time. If we define $n_s^2 = s_a + s_{lp}$ as the variance rate 
for shot noise (in $\mathrm{e}^{-}/\mathrm{s}$) and $n_T^2 = s_T$ as the variance rate for thermal noise, then the noise standard 
deviation after time $t$ is the square root of the accumulated variance. Read noise does not, however, accumulate over time, as it is 
only added when the sensor is read out, i.e. once per exposure.

So to calculate the noise over one exposure, we can calculate:

1. For shot noise: $N_s = \sqrt{n_s^2 t} = n_s \sqrt{t}$, where $n_s^2 = s_a + s_{lp}$ is the variance rate
2. And likewise for thermal noise: $N_T = \sqrt{n_T^2 t} = n_T \sqrt{t}$, where $n_T^2 = s_T$ is the variance rate
3. And for read noise we only have the one contribution per exposure $N_r$

Adding these noise contributions together, we get:

$$
N = \sqrt{ t \left( n_s^2 + n_T^2 \right)+ N_r^2}
$$

Combining this with the signal we derived earlier, gives us a Signal to Noise Ratio ($SNR$):

$$
SNR = \frac{S}{N} = \frac{\left(s_a +s_{lp} + s_{T}\right) t}{\sqrt{ t \left( n_s^2 + n_T^2 \right)+ N_r^2}}
$$