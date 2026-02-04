# Animal Face Test (Teachable Machine Integration)

## Overview

A web application that utilizes a Teachable Machine image classification model to classify animals (specifically dog/cat for "animal face test"). It will leverage webcam input for real-time predictions.

## Project Outline

*   **`index.html`**: The main HTML file, hosting the webcam container, prediction results, and necessary script imports.
*   **`style.css`**: The CSS file for styling the application, including the Teachable Machine elements and maintaining the dark/white theme.
*   **`main.js`**: The JavaScript file containing the Teachable Machine model loading, webcam setup, and prediction logic, along with the existing theme switching functionality.
*   **`my_model/` (New Directory)**: This directory will contain the `model.json` and `metadata.json` files for the Teachable Machine model. **(User needs to provide these files).**

## Current Plan

1.  **Update `index.html`**:
    *   Remove existing Lotto Number Generator and Inquiry Form content.
    *   Add the Teachable Machine HTML structure: `<div>Teachable Machine Image Model</div>`, `<button onclick="init()">Start</button>`, `<div id="webcam-container"></div>`, `<div id="label-container"></div>`.
    *   Add the Teachable Machine library script imports (`tf.min.js`, `teachablemachine-image.min.js`).
    *   Integrate the provided Teachable Machine JavaScript code.
2.  **Update `main.js`**:
    *   Retain the theme switching logic.
    *   Integrate the provided Teachable Machine `init()`, `loop()`, and `predict()` functions.
    *   Ensure proper initialization of the Teachable Machine model.
3.  **Update `style.css`**:
    *   Remove styles specific to the Lotto Number Generator and Inquiry Form.
    *   Add styling for the new Teachable Machine elements (`webcam-container`, `label-container`, buttons, etc.) to align with the existing dark/white theme.
4.  **Create `my_model` directory (if not exists)**: Inform the user that they need to populate this directory with their Teachable Machine model files (`model.json`, `metadata.json`).
5.  **Commit and Push**: Stage and commit all changes, then push to the remote repository.