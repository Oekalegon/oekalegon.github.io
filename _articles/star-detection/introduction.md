---
layout: article
title: "Star Detection in Astrophotographs: An Introduction"
series: "Star Detection in Astrophotographs"
series_order: 1
categories: astrophotography star-detection image-processing
published: true
usemathjax: true
---

One fundamental task in modern astrophotography is the detection of stars in astrophotographs. We need it when we are stacking different frames or when we want to identify the objects visible in the astrophoto.

## What is Star Detection and what is it not
Star detection is the detection of the position of stars in a astrophotography frame. It is not the recognition of which star it is. In detection we do not (yet) need to put a name or identifier to the star. We just want to find the image coordinates (mainly the $x$ and $y$ coordinates in pixels) of the stars.

The expected result of a star detection process is a (possibly long) list of star positions. We are mostly interested in:
* The $x$ and $y$ coordinates of the centre (centroid) of the star

But often we also would like data that is a measure for the quality of the frame:
* The length of the major ($a$) and minor ($b$) axes of the star image in the frame, this gives us the size of the star image, but also,
* The eccentrity ($e$) of the star image, which is an indication of the quality of the frame. If the telescope mount did not track very accurately, or it was not very well polar-aligned, the stars will move during the exposure, forming a track along the frame. If the movement is small this will result in an elliptic star image.
* The rotation angle ($\phi$) of the star image with respect to the axes. 
    * If the star image is perfectly round, no rotation can be determined. 
    * If the frame rotates with respect to the sky, probably due to bad polar alignment, the rotation will be different between stars in different parts of the image. 
    * If the rotation is the same for all stars, the tracking will have been off.
