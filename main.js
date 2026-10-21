/**
 * Dipanshi Yadav | QA Engineer Portfolio
 * Interactive Scripts & QA Sandbox Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Theme Toggle (Dark / Light) with LocalStorage
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('dy_portfolio_theme') || 'dark';

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('dy_portfolio_theme', theme);
        if (theme === 'light') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun text-yellow"></i>';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        }
    }

    setTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    /* --------------------------------------------------------------------------
       2. Mobile Navigation Toggle
       -------------------------------------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link, .nav-actions .btn').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    /* --------------------------------------------------------------------------
       3. Dynamic Typing Effect for Hero Section
       -------------------------------------------------------------------------- */
    const typedTextElement = document.getElementById('typed-text');
    const phrases = [
        "Manual & Functional Testing",
        "REST API Validation (Postman)",
        "SQL Database Verification",
        "Test Case Design & Execution",
        "Defect Life Cycle & Jira Reporting",
        "Regression & Exploratory QA"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1600; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typedTextElement) {
        setTimeout(typeEffect, 500);
    }

    /* --------------------------------------------------------------------------
       4. Active Navigation Scroll Spy
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    /* --------------------------------------------------------------------------
       5. Skills Filtering
       -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       6. Interactive Live QA Test Sandbox Engine
       -------------------------------------------------------------------------- */
    const testEmailInput = document.getElementById('test-email');
    const testQtyInput = document.getElementById('test-quantity');
    const testPromoInput = document.getElementById('test-promo');
    const testApiMock = document.getElementById('test-api-mock');

    const btnRunAssertions = document.getElementById('btn-run-assertions');
    const btnQuickPass = document.getElementById('btn-quick-pass');
    const btnTriggerBug = document.getElementById('btn-trigger-bug');
    const btnResetLab = document.getElementById('btn-reset-lab');

    const consoleLogs = document.getElementById('console-logs');
    const countPassed = document.getElementById('count-passed');
    const countFailed = document.getElementById('count-failed');
    const executionTime = document.getElementById('execution-time');
    const assertionStatus = document.getElementById('assertion-status');

    function getTimestamp() {
        const now = new Date();
        return `[${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}]`;
    }

    function addLog(text, type = 'info') {
        const logLine = document.createElement('div');
        logLine.className = `log-item ${type}`;
        logLine.innerHTML = `<span class="timestamp">${getTimestamp()}</span> ${text}`;
        consoleLogs.appendChild(logLine);
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    function clearLogs() {
        consoleLogs.innerHTML = '';
    }

    function runAssertions() {
        const startTime = performance.now();
        clearLogs();
        assertionStatus.textContent = 'Status: Executing Test Suite...';
        addLog('Initiating Regression Test Suite: CheckoutValidationSuite_v1.0', 'info');

        let passed = 0;
        let failed = 0;

        const email = (testEmailInput.value || '').trim();
        const qty = parseInt(testQtyInput.value, 10);
        const promo = (testPromoInput.value || '').trim();
        const apiStatus = testApiMock.value;

        // Assertion 1: Email Regex Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailRegex.test(email)) {
            addLog(`ASSERT PASS: [TC-EMAIL-01] Valid email format '${email}' satisfies regex RFC 5322.`, 'pass');
            passed++;
        } else {
            addLog(`ASSERT FAIL: [TC-EMAIL-01] Invalid email '${email}'. Expected standard format name@domain.com. Defect logged.`, 'fail');
            failed++;
        }

        // Assertion 2: Quantity Boundary Value Analysis (1 <= qty <= 99)
        if (!isNaN(qty) && qty >= 1 && qty <= 99) {
            addLog(`ASSERT PASS: [TC-QTY-02] Quantity (${qty}) is within boundary limit [1, 99].`, 'pass');
            passed++;
        } else {
            addLog(`ASSERT FAIL: [TC-QTY-02] Boundary violation! Quantity '${testQtyInput.value}' is out of bounds (1-99). Negative/Zero not allowed.`, 'fail');
            failed++;
        }

        // Assertion 3: Promo code SQL / Special character sanitization
        const illegalCharsRegex = /['";<>\-\-\*\/\=]/;
        if (!promo) {
            addLog(`ASSERT PASS: [TC-PROMO-03] Optional promo code is empty. Allowed default.`, 'pass');
            passed++;
        } else if (illegalCharsRegex.test(promo)) {
            addLog(`ASSERT FAIL: [TC-PROMO-03] Potential SQLi / illegal characters in promo code '${promo}'. Sanitization check failed!`, 'fail');
            failed++;
        } else {
            addLog(`ASSERT PASS: [TC-PROMO-03] Promo code '${promo}' successfully sanitized and formatted.`, 'pass');
            passed++;
        }

        // Assertion 4: Simulated REST API Endpoint Response
        if (apiStatus === '200') {
            addLog(`ASSERT PASS: [TC-API-04] REST API endpoint returned 200 OK. Response body JSON schema validated.`, 'pass');
            passed++;
        } else if (apiStatus === '400') {
            addLog(`ASSERT FAIL: [TC-API-04] REST API returned 400 Bad Request. Missing mandatory payload fields.`, 'fail');
            failed++;
        } else {
            addLog(`ASSERT FAIL: [TC-API-04] REST API 500 Internal Server Error. Backend database timeout.`, 'fail');
            failed++;
        }

        // Assertion 5: Database CRUD Consistency
        if (failed === 0) {
            addLog(`ASSERT PASS: [TC-DB-05] SQL transaction committed successfully. Order ID persisted in SQLite database.`, 'pass');
            passed++;
        } else {
            addLog(`ASSERT WARN: [TC-DB-05] SQL transaction rolled back due to assertion failures. Integrity maintained.`, 'warn');
        }

        const endTime = performance.now();
        const duration = Math.round(endTime - startTime) + Math.floor(Math.random() * 15 + 10);

        countPassed.textContent = passed;
        countFailed.textContent = failed;
        executionTime.textContent = `${duration} ms`;

        if (failed === 0) {
            assertionStatus.innerHTML = '<span style="color: #34d399;"><i class="fas fa-check-circle"></i> Suite Status: 100% PASS</span>';
            showToast('All QA assertions passed successfully!');
        } else {
            assertionStatus.innerHTML = `<span style="color: #fb7185;"><i class="fas fa-triangle-exclamation"></i> Suite Status: ${failed} Defect(s) Detected</span>`;
            showToast(`Found ${failed} defect(s)! Check QA log.`);
        }
    }

    if (btnRunAssertions) {
        btnRunAssertions.addEventListener('click', runAssertions);
    }

    if (btnQuickPass) {
        btnQuickPass.addEventListener('click', () => {
            testEmailInput.value = 'qa.lead@shopeasy.com';
            testQtyInput.value = '3';
            testPromoInput.value = 'SAVE20';
            testApiMock.value = '200';
            runAssertions();
        });
    }

    if (btnTriggerBug) {
        btnTriggerBug.addEventListener('click', () => {
            testEmailInput.value = 'tester@@invalid-domain';
            testQtyInput.value = '-4';
            testPromoInput.value = "PROMO'; DROP TABLE orders;--";
            testApiMock.value = '500';
            runAssertions();
        });
    }

    if (btnResetLab) {
        btnResetLab.addEventListener('click', () => {
            testEmailInput.value = 'tester@shopeasy.com';
            testQtyInput.value = '2';
            testPromoInput.value = 'SAVE20';
            testApiMock.value = '200';
            clearLogs();
            addLog('Sandbox reset to default state. Ready to execute assertions.', 'info');
            countPassed.textContent = '0';
            countFailed.textContent = '0';
            executionTime.textContent = '0 ms';
            assertionStatus.textContent = 'Status: Ready to run';
        });
    }

    /* --------------------------------------------------------------------------
       7. Modal Management (Bug Ticket & Test Case Matrix & Resume)
       -------------------------------------------------------------------------- */
    const bugModal = document.getElementById('bug-modal');
    const testcaseModal = document.getElementById('testcase-modal');
    const resumeModal = document.getElementById('resume-modal');

    const bugModalContent = document.getElementById('bug-modal-content');
    const testcaseModalContent = document.getElementById('testcase-modal-content');
    const modalTicketId = document.getElementById('modal-ticket-id');
    const modalMatrixId = document.getElementById('modal-matrix-id');

    // Bug ticket repository data
    const bugTickets = {
        shopeasy: {
            id: 'SHOP-BUG-204',
            title: 'Cart item count desynchronizes and duplicates order charge on rapid multi-clicks',
            project: 'ShopEasy E-Commerce',
            severity: 'High',
            priority: 'P1 - Critical',
            reporter: 'Dipanshi Yadav (QA)',
            environment: 'Staging Build v2.4.1 (Chrome 122, macOS & Windows)',
            steps: [
                'Navigate to Product Catalog and choose "Wireless ANC Headphones".',
                'Rapidly click the "Add to Cart" button 3 times in under 1 second.',
                'Open Cart slider and observe Total Item count vs. displayed total amount.',
                'Proceed to checkout page.'
            ],
            expected: 'Add button debounces subsequent clicks while request is pending. Exactly 1 item added to cart, total reflects single unit price ($89.99).',
            actual: 'Cart shows 3 items, but checkout session creates duplicate pending webhook entries, attempting duplicate authorization charges.',
            reproducibility: '100% Reproducible'
        },
        ngo: {
            id: 'NGO-BUG-112',
            title: 'Volunteer registration modal accepts missing phone number and breaks layout on Safari iOS',
            project: 'NGO Web Application',
            severity: 'Medium',
            priority: 'P2 - High',
            reporter: 'Dipanshi Yadav (QA)',
            environment: 'Production Canary (Safari iOS 17.2, iPhone 14 Pro)',
            steps: [
                'Access homepage and click "Join as Volunteer" modal button.',
                'Fill in Full Name and Email Address.',
                'Leave mandatory "Contact Phone Number" field empty.',
                'Tap "Submit Application" button on mobile viewport.'
            ],
            expected: 'HTML5 client-side and JavaScript regex validation should intercept submission, highlight phone field with error: "Phone number is required".',
            actual: 'Form submits with null phone payload; modal backdrop locks the viewport without confirmation toast and requires a hard page refresh.',
            reproducibility: '100% Reproducible'
        },
        orangehrm: {
            id: 'OHRM-BUG-340',
            title: 'Employee PIM record saves without mandatory "Date of Joining" validation check',
            project: 'OrangeHRM System',
            severity: 'High',
            priority: 'P1 - High',
            reporter: 'Dipanshi Yadav (QA)',
            environment: 'QA Staging Environment (SQLite / MariaDB backend)',
            steps: [
                'Log in as HR Admin and navigate to PIM -> Add Employee.',
                'Enter First Name: "Rahul", Last Name: "Sharma", Employee ID: "EMP-409".',
                'Leave "Date of Joining" calendar field completely blank.',
                'Click "Save".'
            ],
            expected: 'Form submission blocked with inline red warning: "Date of Joining is mandatory". Record must NOT be inserted into database.',
            actual: 'Employee profile is created with null/default timestamp 1970-01-01, corrupting subsequent leave balance calculation algorithms.',
            reproducibility: 'Consistent on all browser environments'
        }
    };

    // Test case matrix data
    const testCaseMatrices = {
        shopeasy: {
            id: 'TC-SHOPEASY-SUITE-01',
            title: 'ShopEasy E-Commerce Core Regression Matrix',
            cases: [
                { id: 'TC_SE_01', module: 'Authentication', desc: 'Valid user login with registered email and password', expected: 'Redirects to Dashboard with active JWT auth cookie', status: 'PASS' },
                { id: 'TC_SE_02', module: 'Authentication', desc: 'Login attempt with unregistered email', expected: 'Displays: "Invalid credentials" (No user leak)', status: 'PASS' },
                { id: 'TC_SE_03', module: 'Search', desc: 'Search with special characters (%$#@!)', expected: 'Displays zero results gracefully without 500 error', status: 'PASS' },
                { id: 'TC_SE_04', module: 'Cart', desc: 'Add out-of-stock product to cart', expected: '"Add to Cart" button disabled; stock alert shown', status: 'PASS' },
                { id: 'TC_SE_05', module: 'Checkout', desc: 'Apply valid promo code (SAVE20)', expected: '20% discount applied to subtotal accurately', status: 'PASS' },
                { id: 'TC_SE_06', module: 'Payment', desc: 'Checkout with expired credit card', expected: 'Payment gateway error caught, user notified safely', status: 'PASS' }
            ]
        },
        ngo: {
            id: 'TC-NGO-SUITE-02',
            title: 'NGO Web App Cross-Browser & Responsiveness Matrix',
            cases: [
                { id: 'TC_NGO_01', module: 'Responsive UI', desc: 'Navbar collapses to hamburger menu at <= 768px', expected: 'Smooth drawer transition, zero horizontal overflow', status: 'PASS' },
                { id: 'TC_NGO_02', module: 'Forms', desc: 'Volunteer sign-up with invalid email format', expected: 'Inline error displayed before form dispatch', status: 'PASS' },
                { id: 'TC_NGO_03', module: 'Cross-Browser', desc: 'Donation flow verification on Chrome, Firefox, Safari', expected: 'Uniform SVG rendering and seamless button click events', status: 'PASS' },
                { id: 'TC_NGO_04', module: 'Accessibility', desc: 'Keyboard TAB navigation across all form elements', expected: 'All inputs have visible focus outline & tab-index order', status: 'PASS' }
            ]
        },
        orangehrm: {
            id: 'TC-OHRM-SUITE-03',
            title: 'OrangeHRM PIM & Workflow Verification Matrix',
            cases: [
                { id: 'TC_OHRM_01', module: 'PIM', desc: 'Add new employee with all mandatory fields', expected: 'Record inserted, unique EmpID generated', status: 'PASS' },
                { id: 'TC_OHRM_02', module: 'RBAC', desc: 'Regular employee access to Admin Configuration URL', expected: 'HTTP 403 Forbidden redirected to Access Denied page', status: 'PASS' },
                { id: 'TC_OHRM_03', module: 'Leave Mgmt', desc: 'Apply for leave exceeding allocated annual balance', expected: 'Alert: "Insufficient leave balance" prevents application', status: 'PASS' },
                { id: 'TC_OHRM_04', module: 'DB Integrity', desc: 'Verify employee record in SQLite backend tables', expected: 'Row data matches submitted payload 1-to-1', status: 'PASS' }
            ]
        }
    };

    // Open Bug Modal
    document.querySelectorAll('.open-bug-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = bugTickets[projectKey];
            if (!data) return;

            modalTicketId.textContent = data.id;
            bugModalContent.innerHTML = `
                <div class="jira-ticket-view">
                    <h3 class="jira-ticket-title">${data.title}</h3>
                    
                    <div class="jira-meta-grid">
                        <div class="meta-field">
                            <label>Project</label>
                            <span>${data.project}</span>
                        </div>
                        <div class="meta-field">
                            <label>Severity</label>
                            <span class="text-red"><i class="fas fa-circle-exclamation"></i> ${data.severity}</span>
                        </div>
                        <div class="meta-field">
                            <label>Priority</label>
                            <span class="text-yellow"><i class="fas fa-arrow-up"></i> ${data.priority}</span>
                        </div>
                        <div class="meta-field">
                            <label>Reporter</label>
                            <span>${data.reporter}</span>
                        </div>
                        <div class="meta-field">
                            <label>Status</label>
                            <span class="text-cyan">Open / Investigating</span>
                        </div>
                        <div class="meta-field">
                            <label>Reproducibility</label>
                            <span>${data.reproducibility}</span>
                        </div>
                    </div>

                    <div>
                        <div class="jira-block-title">Environment & Test Platform</div>
                        <p class="text-secondary" style="font-family: var(--font-mono); font-size: 0.85rem;">${data.environment}</p>
                    </div>

                    <div>
                        <div class="jira-block-title">Steps to Reproduce</div>
                        <ol class="jira-steps-list">
                            ${data.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>

                    <div class="result-comparison">
                        <div class="result-box expected">
                            <strong><i class="fas fa-check-circle"></i> Expected Result:</strong>
                            <p style="margin-top: 4px;">${data.expected}</p>
                        </div>
                        <div class="result-box actual">
                            <strong><i class="fas fa-bug"></i> Actual Result:</strong>
                            <p style="margin-top: 4px;">${data.actual}</p>
                        </div>
                    </div>
                </div>
            `;

            bugModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Open Test Case Matrix Modal
    document.querySelectorAll('.open-testcase-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = testCaseMatrices[projectKey];
            if (!data) return;

            modalMatrixId.textContent = data.id;
            testcaseModalContent.innerHTML = `
                <div style="margin-bottom: 16px;">
                    <h3 style="font-size: 1.2rem; font-weight: 700;">${data.title}</h3>
                    <p class="text-muted" style="font-size: 0.85rem;">Suite ID: ${data.id} &bull; Executed by Dipanshi Yadav</p>
                </div>

                <div class="testcase-table-wrap">
                    <table class="testcase-table">
                        <thead>
                            <tr>
                                <th>Test ID</th>
                                <th>Module</th>
                                <th>Test Description</th>
                                <th>Expected Outcome</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.cases.map(tc => `
                                <tr>
                                    <td><strong style="font-family: var(--font-mono);">${tc.id}</strong></td>
                                    <td><span class="badge badge-accent">${tc.module}</span></td>
                                    <td>${tc.desc}</td>
                                    <td>${tc.expected}</td>
                                    <td><span class="badge badge-pass"><i class="fas fa-check"></i> ${tc.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            testcaseModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Open Resume Modal
    document.querySelectorAll('.open-resume-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modals
    function closeAllModals() {
        [bugModal, testcaseModal, resumeModal].forEach(modal => {
            if (modal) modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.modal-close, .modal-close-btn, .modal-overlay').forEach(el => {
        el.addEventListener('click', closeAllModals);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Print Resume Button
    const btnPrintResume = document.getElementById('btn-print-resume');
    if (btnPrintResume) {
        btnPrintResume.addEventListener('click', () => {
            window.print();
        });
    }

    /* --------------------------------------------------------------------------
       8. Copy to Clipboard Utility
       -------------------------------------------------------------------------- */
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied to clipboard: ${textToCopy}`);
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-check text-green';
                    setTimeout(() => {
                        icon.className = 'far fa-copy';
                    }, 2000);
                }
            }).catch(() => {
                showToast('Unable to copy. Please copy manually.');
            });
        });
    });

    /* --------------------------------------------------------------------------
       9. Contact Form QA Validation & Submission Handling
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('sender-name').value.trim();
            const email = document.getElementById('sender-email').value.trim();
            const message = document.getElementById('sender-message').value.trim();

            if (!name || !email || !message) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Validation Error: Please fill in all mandatory fields (*).';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Validation Error: Please provide a valid work email address.';
                return;
            }

            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = '<i class="fas fa-circle-check"></i> QA Verified! Thank you for reaching out. Opening your email client to send message...';

            setTimeout(() => {
                const subject = encodeURIComponent(document.getElementById('sender-subject').value.trim() || 'QA Engineer Opportunity');
                const body = encodeURIComponent(`Hi Dipanshi,\n\n${message}\n\nFrom: ${name} (${email})`);
                window.location.href = `mailto:dipanshiyadav9876@gmail.com?subject=${subject}&body=${body}`;
            }, 1000);
        });
    }

    /* --------------------------------------------------------------------------
       10. Auto Footer Year
       -------------------------------------------------------------------------- */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
