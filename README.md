# ssd-owsap-vulnerabilities

## Group Members
- *IT22338952 – FERNANDO G.W.C.K (Group Leader)*  
- *IT22640116 – MEEGODA A.I*  
- *IT22074072 – SANJANA L.A.D*  
- *IT22890900 – DILSHAN D.G.S*  

## Project Overview
*Healthcard* is our project used to *identify and analyze security vulnerabilities* in web applications. It demonstrates both dynamic and static testing techniques to help developers understand common security risks and mitigation strategies.

## Identified Vulnerabilities

### Dynamic Testing (OWASP ZAP)
Through dynamic testing using OWASP ZAP, the following vulnerabilities were identified:  
- Cross-Domain Misconfiguration  
- Content Security Policy (CSP) Header Not Set  
- Missing Anti-clickjacking Header  
- X-Content-Type-Options Header Missing  
- Information Disclosure  
- Hidden File Found  

### Static Analysis (Snyk)
Through static analysis using Snyk, the following vulnerabilities were detected:  
- DOM-based Cross-Site Scripting (XSS)  
- Regular Expression Denial of Service (ReDoS)  
- Hardcoded Non-Cryptographic Secrets  
- Server-Side Request Forgery (SSRF)  
- NoSQL Injection  
- Uncaught Exceptions  
- Predictable Value Ranges