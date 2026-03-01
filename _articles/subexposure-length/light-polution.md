---
layout: article
title: "Light Pollution for Astrophotographers"
series: "Exposure time and Stacking in Astrophotography"
series_order: 2
categories: astrophotography light-pollution
published: true
usemathjax: true
---

Light pollution refers to unwanted photons from artificial lighting sources (streetlights, city glow, etc.) that scatter in the atmosphere and enter the telescope. This is an unwanted background signal that adds to our total signal but doesn't contribute useful information about our astronomical target. The light pollution signal rate $s_{lp}$ (the number of photons per second) depends on the level of light pollution at the imaging location, the altitude of the target above the horizon, and atmospheric conditions. In heavily light-polluted areas, this can be a significant component of the total signal.

Light pollution is often expressed in the Bortle Scale, which measures the night's sky brightness at a particular location. It is a nine point scale, ranging from Class 1, a truly dark site, to Class 9, in the inner city.
To find out how high the light pollution is at your location, you can look up your location in this [light pollution map](https://lightpollutionmap.app/?lat=60.369071&lng=11.369133&zoom=12).

The Bortle scale is defined by the visibility of well-known celestial objects, but can be related to sky brightness measurement. Sky brightness is measured in magnitude per square arcsecond ($\mathrm{mag}/\mathrm{arcsec}^2$). 

The Bortle scale classification is summarized in the following table:

| Class | Description | LNEM | Sky Brightness | Visibility of Objects |
| | | $\mathrm{mag}$ | $\mathrm{mag} \cdot \mathrm{arcsec}^{-2}$ ||
|-------|-------------|------------------------------|------------------------------|----------------------|
| 1 | Excellent dark-sky site | 7.6–8.0 | 21.7–22.0 | M33 and M31 easily visible with naked eye; zodiacal light visible; airglow visible |
| 2 | Typical truly dark site | 7.1–7.5 | 21.5–21.7 | M33 easily visible with averted vision; M31 easily visible; zodiacal light visible |
| 3 | Rural sky | 6.6–7.0 | 21.3–21.5 | M33 visible with averted vision; M31 easily visible; some zodiacal light visible |
| 4 | Rural/suburban transition | 6.1–6.5 | 20.4–21.3 | M31 visible but not impressive; M33 difficult; zodiacal light barely visible |
| 5 | Suburban sky | 5.6–6.0 | 19.1–20.4 | M31 barely visible; M33 not visible; no zodiacal light; light pollution visible on horizon |
| 6 | Bright suburban sky | 5.1–5.5 | 18.0–19.1 | M31 barely visible with averted vision; Milky Way only visible near zenith |
| 7 | Suburban/urban transition | 4.6–5.0 | 17.0–18.0 | Milky Way nearly or completely invisible; M31 not visible; light pollution dominates |
| 8 | City sky | 4.1–4.5 | 16.0–17.0 | Only bright stars visible; Milky Way not visible; sky has grayish or orange glow |
| 9 | Inner-city sky | 4.0 or less | 15.0–16.0 | Only brightest stars visible; sky is bright gray or orange; many stars not visible due to light pollution |

*Table based on Bortle (2001)[^1] and subsequent refinements relating sky brightness measurements to the scale. LNEM is the Limiting Naked Eye Magnitude. The values here are usually measured at zenith and in the V-band, which is a photometric passband closely related to the human eye.*


## Calculating the photon flux

For our calculations we would like to know the number of photons due to light pollution that are likely to strike a pixel on our imaging sensor.
From the table we know the sky brightness in magnitude per arcsecond. To get to a number of photons, we will need to convert the sky brightness magnitude to the sky brightness flux, which
is usually expressed in energy per second (Watts) per surface area ($\mathrm{W} \cdot \mathrm{m}^2$). It is related to magnitude according to the formula:

$$
m_1 - m_{\mathrm{ref}} = -2.5 \log_{10}{\frac{F_1}{F_{\mathrm{ref}}}}
$$

Where $m_1$ is the magnitude of an object, or in our case a small patch ($1\,\mathrm{arcsec}^2$) of sky. This equation expresses the magnitude difference with a reference magnitude $m_{\mathrm{ref}}$ as the flux ratio $F_1 / F_{\mathrm{ref}}$. While the flux is usually expressed as energy per unit of time per surface unit, we can express it as the number of photons per unit of time per surface unit just as wel.

If we use magnitude $0$ as the reference magnitude, we need to know the number of photons striking a surface unit per second. Standard tables (Bessel, 1979)[^2] give the flux density of a magnitude $m_{\mathrm{ref}} = 0$ star as $3640\, \mathrm{Jy}$, which, when integrated over the V band gives us $F_{\mathrm{ref}} = 8.81 \cdot 10^5 \, \gamma \cdot \mathrm{s}^{-1}\cdot\mathrm{cm}^{-2}$, i.e. the number of photons ($\gamma$) per second per centimetre squared.

Using this in the magnitude equation, we get:

$$
m - 0 = -2.5 \log_{10}{\frac{F}{8.81 \cdot 10^5}}
$$

$$
m = -2.5 \left( \log_{10}{F} - \log_{10}{\left[8.81 \cdot 10^5\right]} \right)
$$

$$
m = -2.5 \left( \log_{10}{F} - 5.945 \right)
$$

$$
m = -2.5 \log_{10}{F} + 14.863
$$

$$
\log_{10}{F} = \frac{14.863 - m}{2.5}
$$

Using the Sky brightness data from the Bortle table, we get, for instance, for Bortle class ~4.5 with a sky brightness magnitude of $21\, \mathrm{mag} \cdot \mathrm{arcsec}^{-2}$ a value of $F = 0.0035 \, \gamma \cdot \mathrm{s}^{-1}\cdot\mathrm{cm}^{-2}\cdot\mathrm{arcsec}^{-2}$, i.e. 0.0035 photons per second per square centimetre per square arcsecond.

My Newtonian telescope has an aperture of $204\, \mathrm{mm}$, which means the area from which photons are collected is about $327 \mathrm{cm}^2$. This means that my telescope will collect on average about $1.14$ photons every second from a square arcsecond patch of sky.

Ideally, you choose your camera in combination with your telescope, so that each pixel corresponds to about one square arcsecond. Mostly because, that is the best resolution one, can reasonably achieve with a telescope on Earth, without any adaptive optics.

So this gives the contribution of light pollution to the signal that I recieve per camera pixel in my Bortle 4 sky as about 1 photon per second in the V-band.

## Putting it all together

The following table summarizes the light pollution signal for each Bortle class, calculated for a 204 mm Newton telescope (collecting area $327\,\mathrm{cm}^2$) with a camera having $1\,\mathrm{arcsec}$ per pixel:

| Bortle Class | Sky Brightness| Flux $F$  | Signal due to light pollution $s_{lp}$ |
|| $\mathrm{mag} \cdot \mathrm{arcsec}^{-2}$ | $\gamma \cdot \mathrm{s}^{-1}\cdot\mathrm{cm}^{-2}\cdot\mathrm{arcsec}^{-2}$ | $\gamma \cdot \mathrm{s}^{-1}$
|-------------|------------------------------|-------------------------------------|----------------------------|
| 1 | 21.7–22.0 | 0.0018–0.0014 | 0.59–0.46 |
| 2 | 21.5–21.7 | 0.0023–0.0018 | 0.75–0.59 |
| 3 | 21.3–21.5 | 0.0028–0.0023 | 0.92–0.75 |
| 4 | 20.4–21.3 | 0.0048–0.0028 | 1.57–0.92 |
| 5 | 19.1–20.4 | 0.013–0.0048 | 4.3–1.57 |
| 6 | 18.0–19.1 | 0.040–0.013 | 13.1–4.3 |
| 7 | 17.0–18.0 | 0.103–0.040 | 33.7–13.1 |
| 8 | 16.0–17.0 | 0.259–0.103 | 84.7–33.7 |
| 9 | 15.0–16.0 | 0.651–0.259 | 213–84.7 |

The flux values are calculated using the formula $\log_{10}{F} = \frac{14.863 - m}{2.5}$, where $m$ is the sky brightness magnitude. The photons per second per pixel are obtained by multiplying the flux by the telescope collecting area ($327\,\mathrm{cm}^2$) and the pixel solid angle ($1\,\mathrm{arcsec}^2$).

## Interactive Light Pollution Calculator

You can calculate the light pollution signal for your specific telescope and camera setup using my [interactive calculator](/light-pollution-calculator/).

[^1]: Bortle, J. E. (2001). "The Bortle Dark-Sky Scale". *Sky & Telescope*, 101(2), 126–129.

[^2]: Bessel, M. S. (1979). "UBVRI photometric standard stars in the magnitude range 11.5 < V < 16.0 around the celestial equator". *Astronomical Journal*, 84, 1321–1330.

