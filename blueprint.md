# Multi-App Platform (Lotto, Inquiry, 동물상, Disqus)

## Overview

A single-page web application featuring multiple interactive tools: a Lotto Number Generator, a partnership inquiry form (Formspree integrated), an Animal Look-alike Test using Teachable Machine (with **both webcam and image upload functionality**), and a Disqus comment section. The platform supports dark/light theme switching.

## Project Outline

*   **`index.html`**: The main HTML file, structured with distinct sections for each application and a navigation system to switch between them. Includes necessary library imports for Teachable Machine and Disqus.
*   **`style.css`**: The CSS file for styling all application sections, navigation, and maintaining a responsive design with dark/light theme support.
*   **`main.js`**: The JavaScript file containing logic for theme switching, section navigation, lotto number generation, and the refactored Teachable Machine integration (**supporting both webcam and image upload** with prediction logic).
*   **`my_model/`**: This directory contains the `model.json` and `metadata.json` files for the Teachable Machine model. **(User needs to provide these files).**

## Current Plan

1.  **Modify `index.html`**:
    *   Updated the "Animal Face Test" section:
        *   Title changed from "말과 닮은꼴" to "동물상".
        *   **Reintroduced "카메라 시작" button.**
        *   Ensured `webcam-container` is present and its `display: none;` inline style is removed (to be controlled by JS).
        *   `uploaded-image-container` is initially hidden (controlled by JS).
    *   Confirmed restoration of Lotto Number Generator, Formspree Inquiry Form, and Disqus Comment Section.
2.  **Refactor `main.js`**:
    *   **Reintroduced all webcam-related functions and logic (`webcam`, `initWebcam`, `loop`, `predictWebcam`).**
    *   Teachable Machine functionality now supports **both image file uploads and webcam input**.
    *   `loadModel()` is called on `DOMContentLoaded` to ensure the model is loaded early.
    *   `resetTeachableMachine()` function adjusted to properly handle both webcam and image states.
    *   Added `try-catch` block to `loadModel()` for better error reporting if model files are missing.
    *   Improved clarity and robustness of element IDs (e.g., `labelContainerTM`).
3.  **Refactor `style.css`**:
    *   **Shrunk Disqus comment section:** Reduced `max-width` of `.disqus-container` to `400px`.
    *   **Pastel background:** Updated `--background-color` variables for both light and dark themes to pastel shades. Also applied pastel colors to Lotto numbers.
    *   Ensured styles are compatible with both webcam and image upload containers.
    *   Ensured all styles are compatible with dark/light themes.
4.  **`my_model` directory**: Confirmed existence of `my_model` directory. **User must place their `model.json` and `metadata.json` files inside this directory for the Teachable Machine feature to work.**
5.  **Commit and Push**: Stage and commit all changes, then push to the remote repository.

## Important Note on Teachable Machine Functionality:

The "동물상" (Animal Face Test) feature requires model files (`model.json` and `metadata.json`) to be present in the `./my_model/` directory. If the feature is not working, please ensure these files are correctly placed. Additionally, check the browser's developer console for any JavaScript errors, especially those related to `tmImage.load` or `model.predict`.
