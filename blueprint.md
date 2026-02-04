# Multi-App Platform (소개, 동물상, 로또, 제휴 문의, Disqus, Google AdSense)

## Overview

A single-page web application featuring multiple interactive tools: a Site Introduction, an Animal Look-alike Test using Teachable Machine (with **both webcam and image upload functionality**), a Lotto Number Generator, a partnership inquiry form (Formspree integrated), and a Disqus comment section. The platform supports dark/light theme switching and now includes Google AdSense integration. The site has been optimized for AdSense approval with content additions and technical improvements, including a dedicated Privacy Policy page.

## Project Outline

*   **`index.html`**: The main HTML file, structured with distinct sections for each application and a navigation system to switch between them. Includes necessary library imports for Teachable Machine and Disqus, plus Google AdSense script and meta tag in the `<head>`. Also contains new meta tags for SEO and descriptive content for sections.
*   **`privacy.html`**: A new dedicated HTML file containing a detailed privacy policy for the site.
*   **`style.css`**: The CSS file for styling all application sections, navigation, and maintaining a responsive design with dark/light theme support.
*   **`main.js`**: The JavaScript file containing logic for theme switching, section navigation, lotto number generation, and the refactored Teachable Machine integration (**supporting both webcam and image upload** with prediction logic).
*   **`ads.txt`**: A new file in the root directory for Google AdSense verification.
*   **`robots.txt`**: A new file in the root directory to guide search engine crawlers.
*   **Teachable Machine Model**: Now loaded directly from a hosted URL (`https://teachablemachine.withgoogle.com/models/guvsM29DK/`). The local `my_model/` directory is no longer needed.

## Current Plan

1.  **Modify `index.html`**:
    *   **Reordered navigation buttons:** "소개" (Intro) is now the first button, followed by "동물상 테스트", "로또 번호 생성기", "제휴 문의".
    *   **Reordered `app-section`s:** The `#intro` (formerly `#about`) section is now the first `app-section` in the HTML, followed by `#animal-test`, `#lotto`, and `#inquiry`.
    *   **Updated "Animal Face Test" section:**
        *   Title changed from "말과 닮은꼴" to "동물상".
        *   **Reintroduced "카메라 시작" button.**
        *   Ensured `webcam-container` is present and its `display: none;` inline style is removed (to be controlled by JS).
        *   `uploaded-image-container` is initially hidden (controlled by JS).
        *   **Added descriptive paragraph explaining the "동물상" test.**
    *   **Refined "소개" section:** Title changed from "About This Platform" to "소개". Content now includes detailed "사이트 소개" (Site Introduction) and "주요 기능" (Key Features). Privacy Policy content has been removed and a link to `privacy.html` is provided.
    *   **Added basic SEO meta tags** (`description`, `keywords`) to the `<head>`.
    *   **Google AdSense Integration:** Added the AdSense script and meta tag to the `<head>` section.
2.  **Modify `main.js`**:
    *   **Updated `DOMContentLoaded` logic:** Ensures the "소개" section is active by default on page load.
    *   **Teachable Machine Model URL updated to online hosted model:** `https://teachablemachine.withgoogle.com/models/guvsM29DK/`.
    *   **Reintroduced all webcam-related functions and logic (`webcam`, `initWebcam`, `loop`, `predictWebcam`).**
    *   Teachable Machine functionality now supports **both image file uploads and webcam input**.
    *   `loadModel()` is called on `DOMContentLoaded` to ensure the model is loaded early.
    *   `resetTeachableMachine()` function adjusted to properly handle both webcam and image states.
    *   Added `try-catch` block to `loadModel()` for better error reporting if model files are missing.
    *   Improved clarity and robustness of element IDs (e.g., `labelContainerTM`).
    *   **Prediction results now display as percentages** (`(probability * 100).toFixed(0) + '%'`).
3.  **Refactor `style.css`**:
    *   **Shrunk Disqus comment section:** Reduced `max-width` of `.disqus-container` to `400px`.
    *   **Pastel background:** Updated `--background-color` variables for both light and dark themes to pastel shades. Also applied pastel colors to Lotto numbers.
    *   Ensured styles are compatible with both webcam and image upload containers.
    *   **Added background color to prediction result divs** (`#label-container div`) using `var(--button-bg-color)` and `color: white;`.
    *   Ensured all styles are compatible with dark/light themes.
4.  **Created `ads.txt`**: A new file named `ads.txt` has been created in the root directory with the provided AdSense content.
5.  **Created `robots.txt`**: A new file named `robots.txt` has been created in the root directory with basic rules.
6.  **Created `privacy.html`**: A new dedicated HTML file containing a detailed, generic privacy policy for the site.
7.  **Removed `my_model` directory**: The local `my_model` directory has been deleted as it is no longer needed.
8.  **Commit and Push**: Stage and commit all changes, then push to the remote repository.

## Important Note on Teachable Machine Functionality:

The "동물상" (Animal Face Test) feature now loads its model directly from `https://teachablemachine.withgoogle.com/models/guvsM29DK/`. This eliminates the need for local model files. If the feature is not working, please check the browser's developer console for any JavaScript errors, especially those related to `tmImage.load` or `model.predict`, which might indicate network issues or problems with the hosted model itself.
