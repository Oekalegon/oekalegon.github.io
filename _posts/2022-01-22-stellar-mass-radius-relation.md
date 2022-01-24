---
layout: post
title:  "Relation between Stellar Mass and Radius"
date:   2022-01-22 19:47:01 +0100
categories: astrophysics stars
---
{% include_relative images/star-crosssection-radius-mass-relation.svg %}

The density $$\rho(r)$$ in a star decreases with distance $$r$$ from the centre
according to:

$$\begin{eqnarray} 
\rho(r) &=& \rho_c \left[ 1 -  \left(\frac{r}{R}\right)^2 \right]      \nonumber \\
\end{eqnarray}$$

where $$\rho_c$$ is the density at the centre. The mass within distance $$r$$ of the
centre, $$m(r)$$ can
then be calculated by taking the integral over $$r$$:

$$\begin{eqnarray} 
m(r) &=& \int_0^r 4 \pi r^2 \rho(r) dr  \nonumber \\
&=& 4 \pi \rho_c \int_0^r r^2 \left[1 -  \left(\frac{r}{R}\right)^2 \right] dr  \nonumber \\
&=& 4 \pi \rho_c \int_0^r r^2 -  \frac{r^4}{R^2} dr  \nonumber \\
&=& 4 \pi \rho_c \bigg\rvert_0^r \frac{1}{3} r^3 -  \frac{1}{5 R^2} r^5 \nonumber \\
&=& 4 \pi \rho_c \left[ \frac{1}{3} r^3 -  \frac{r^5}{5 R^2} \right] \nonumber \\
&=& 4 \pi \rho_c r^3 \left[ \frac{1}{3} -  \frac{r^2}{5 R^2} \right] \nonumber \\
\end{eqnarray}$$

The total mass of the star $$M$$ can then be determined by setting $$r$$ to be equal to
the radius of the star $$R$$:

$$\begin{eqnarray} 
M &=& 4 \pi \rho_c R^3 \left[ \frac{1}{3} -  \frac{R^2}{5 R^2} \right] \nonumber \\
&=& 4 \pi \rho_c R^3 \left[ \frac{1}{3} -  \frac{1}{5} \right] \nonumber \\
&=& 4 \pi \rho_c R^3 \frac{2}{15} \nonumber \\
&=& \frac{8}{15} \pi \rho_c R^3  \nonumber \\
\end{eqnarray}$$

which gives us the relation between the mass of a star and its radius given the density
at the centre of the star $$\rho_c$$.

We can also calculate the average density in the star by dividing the mass of the star
by the volume ($$V = 4/3 \pi R^3$$):

$$\begin{eqnarray} 
\bar{\rho} &=& \frac{M}{V} \nonumber \\
&=& \frac{\frac{8}{15} \pi \rho_c R^3}{\frac{4}{3} \pi R^3} \nonumber \\
&=& \frac{2 \pi \rho_c R^3}{5 \pi R^3} \nonumber \\
&=& \frac{2}{5}\frac{\pi \rho_c R^3}{\pi R^3} \nonumber \\
&=& \frac{2}{5} \rho_c \nonumber \\
&=& 0.4 \rho_c \nonumber \\
\end{eqnarray}$$