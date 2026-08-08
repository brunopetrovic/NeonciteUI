# Security Policy

## Reporting a vulnerability

Please do not open a public GitHub issue for an undisclosed security vulnerability.

Use GitHub's private vulnerability reporting feature for this repository when available. Include the affected component or package, reproduction steps, expected impact, and any suggested mitigation you have already identified.

If private vulnerability reporting is unavailable, contact the maintainer through the private contact method listed on the maintainer's GitHub profile rather than publishing exploit details publicly.

## Scope

Security reports may cover the Neoncite CLI, registry installation behavior, generated registry artifacts, the `@neoncite/ui` package, and the documentation/showcase application.

Because registry installation writes source files into a consuming project, reports involving path handling, arbitrary file writes, registry trust boundaries, dependency resolution, or unexpected code execution are especially important.

## Disclosure

Please allow a reasonable remediation window before public disclosure. Confirmed vulnerabilities will be documented with remediation guidance when a fix is released.
