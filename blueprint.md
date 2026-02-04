# Multi-App Platform (Lotto, Inquiry, Animal Look-alike Test, Disqus)

## Overview

A single-page web application featuring multiple interactive tools: a Lotto Number Generator, a partnership inquiry form (Formspree integrated), an Animal Look-alike Test using Teachable Machine (with image upload functionality), and a Disqus comment section. The platform supports dark/light theme switching.

## Project Outline

*   **`index.html`**: The main HTML file, structured with distinct sections for each application and a navigation system to switch between them. Includes necessary library imports for Teachable Machine and Disqus.
*   **`style.css`**: The CSS file for styling all application sections, navigation, and maintaining a responsive design with dark/light theme support.
*   **`main.js`**: The JavaScript file containing logic for theme switching, section navigation, lotto number generation, and the refactored Teachable Machine integration (image upload, prediction logic, no webcam).
*   **`my_model/`**: This directory contains the `model.json` and `metadata.json` files for the Teachable Machine model. **(User needs to provide these files).**

## Current Plan

1.  **Refactor `index.html`**:
    *   Implemented a multi-section layout with navigation buttons (`nav-button`).
    *   Restored Lotto Number Generator, Formspree Inquiry Form, and Disqus Comment Section into their respective `div.app-section` containers.
    *   Updated the "Animal Face Test" section:
        *   Title changed to "말과 닮은꼴".
        *   Removed webcam-related HTML elements.
        *   Simplified `test-options` to focus solely on image upload.
2.  **Refactor `main.js`**:
    *   Implemented JavaScript for section navigation (show/hide `app-section` based on button clicks).
    *   Restored all previous JavaScript logic for Lotto Number Generator and theme switching.
    *   Refactored Teachable Machine integration to support:
        *   Loading the model once.
        *   **Removed all webcam-related functions and logic.**
        *   Focuses solely on handling image file uploads, drawing to canvas, and predicting from it.
        *   A reset mechanism for the Teachable Machine test.
3.  **Refactor `style.css`**:
    *   Added styles for the new navigation (`.main-nav`, `.nav-button`).
    *   Updated `.app-section` styling for proper display/hiding.
    *   Restored and adjusted styles for Lotto numbers (`#numbers`, `.number`), Inquiry form (`.form-container` inputs/buttons), and Disqus (`.disqus-container`).
    *   Updated styles for Teachable Machine elements (`.test-options`, `#uploaded-image-container`, `#label-container`), removing webcam-specific styles.
    *   Ensured all styles are compatible with dark/light themes.
4.  **`my_model` directory**: Confirmed existence of `my_model` directory. **User must place their `model.json` and `metadata.json` files inside this directory for the Teachable Machine feature to work.**
5.  **Commit and Push**: Stage and commit all changes, then push to the remote repository.