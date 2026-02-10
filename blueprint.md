# Multi-App Platform (AdSense Improvement Project)

## Overview

This project is undergoing a significant overhaul to address a Google AdSense rejection. The primary goal is to improve site quality, content value, and user experience to meet AdSense program policies. The "animal look-alike test" feature is being removed, and a more robust "Country-Specific Lottery Number Generator" is being added. The site structure will also be improved with a proper navigation bar and essential static pages.

## Project Outline

*   **`index.html`**: The main HTML file. It will be restructured to include a new header with clear navigation, a new lottery section, and placeholder sections for "About Us" and "Contact Us". The old "animal-test" and Disqus sections will be removed.
*   **`about.html`**: A new page with placeholder "About Us" content.
*   **`contact.html`**: A new page with placeholder "Contact Us" content, potentially linking to the existing inquiry form.
*   **`style.css`**: The stylesheet will be updated to remove styles related to the old features and add styles for the new navigation, lottery section, and other improvements.
*   **`main.js`**: The JavaScript file will be cleaned up to remove the Teachable Machine logic. New JavaScript will be added for the interactive, multi-country lottery number generator.
*   **`privacy.html`**: The existing privacy policy page will be kept and linked from the new navigation.
*   **`ads.txt`**: Will be reviewed to ensure it's correct.
*   **`robots.txt`**: Will be reviewed.

## Current Plan: AdSense Remediation

1.  **Analyze AdSense Policies (Completed):** Reviewed AdSense help documents. The key is to provide unique, valuable content and a good user experience, and have a clear site structure with essential pages (`About`, `Contact`, `Privacy`).

2.  **Update `blueprint.md` (Completed):** The blueprint is updated to reflect the new direction of the project.

3.  **Remove Low-Value Feature:**
    *   **Task:** Eliminate the "동물상 테스트" (Animal Look-alike Test) feature.
    *   **Actions:**
        *   Remove the `#animal-test` section from `index.html`.
        *   Remove the corresponding navigation button from `index.html`.
        *   Delete all Teachable Machine related JavaScript (`loadModel`, `initWebcam`, `predict`, etc.) from `main.js`.
        *   Remove all associated CSS from `style.css`.
        *   Remove the `script` tags for `tf.js` and `teachablemachine-image` from `index.html`.

4.  **Enhance Content with a High-Quality Feature:**
    *   **Task:** Create a "Country-Specific Lottery Number Generator".
    *   **Actions:**
        *   Design a new UI in `index.html` allowing users to select a country/lottery (e.g., USA Powerball, EuroMillions, Korea Lotto 6/45).
        *   Implement the logic in `main.js` to generate numbers based on the rules of the selected lottery (e.g., different number ranges, bonus numbers).
        *   Add information about each lottery, such as draw days or a link to the official site, to increase content value.
        *   Style the new section in `style.css`.

5.  **Improve Site Structure and Navigation:**
    *   **Task:** Replace the button-based navigation with a more traditional header/navigation bar.
    *   **Actions:**
        *   Create a `<header>` element in `index.html`.
        *   Add navigation links for "Home", "Lottery", "About", "Contact", and "Privacy Policy".
        *   Style the new header and navigation in `style.css`.
    *   **Task:** Add essential static pages.
    *   **Actions:**
        *   Create `about.html` and `contact.html` with placeholder text. Users will be advised to fill these in.

6.  **General Cleanup and Quality Improvements:**
    *   **Task:** Remove the Disqus comment section.
    *   **Actions:** Remove the `disqus_thread` div and the associated scripts from `index.html` and styles from `style.css`.
    *   **Task:** Review and ensure `ads.txt` and `robots.txt` are correct.
    *   **Task:** Ensure the overall design is clean, professional, and mobile-responsive.

## Phase 2: Implementation

The next steps involve acting on this plan by modifying the project files. I will start by modifying `index.html` to remove the old feature and add the new structure.