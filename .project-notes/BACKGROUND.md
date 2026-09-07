# Background and Glass Theme

## Current Design

- Light mode uses the user-supplied pastel mountain illustration, `public/assets/landscape-light.png`.
- Dark mode uses the user-supplied twilight lake photograph, `public/assets/landscape-dark.png`.
- Use both images without recoloring. Auto selects the image for the resolved system theme.
- Backgrounds stay fixed, centered, and cover the viewport. Cropping varies with screen proportions.
- Project cards, Experience, About, and Connect use translucent backgrounds with live backdrop blur. Retain opaque fallbacks for browsers without blur support.
- Keep project titles bold and secondary dark-mode text white for readability. Light mode uses darker text.

## Design Context

The user rejected decorative circles and grids. Earlier gradient and generated folded-paper backgrounds were superseded by the supplied landscapes. The frosted rectangular section panels remain intentional: they separate text from the detailed background.
