document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initForm();
});

function initMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const menuDropdown = document.querySelector('.menu-dropdown');

    if (menuIcon && menuDropdown) {
        menuIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            menuDropdown.classList.toggle('active');
        });

        
        document.addEventListener('click', (event) => {
            if (!menuDropdown.contains(event.target) && !menuIcon.contains(event.target)) {
                menuDropdown.classList.remove('active');
            }
        });

        
        const links = menuDropdown.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuDropdown.classList.remove('active');
            });
        });
    }
}


function initForm() {
    const emailInput = document.getElementById('emailInput');
    const submitButton = document.getElementById('submitButton');
    const form = document.getElementById('newsletterForm');

    
    if (emailInput && submitButton) {
        emailInput.addEventListener('input', () => {
            const isValid = isValidEmail(emailInput.value.trim());
            submitButton.disabled = !isValid;
            
            
            submitButton.style.opacity = isValid ? '1' : '0.6';
        });
    }

    
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (isValidEmail(emailInput.value.trim())) {
                showToast();
                emailInput.value = '';
                submitButton.disabled = true;
            }
        });
    }
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('hidden');
        toast.classList.add('show');

        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 500);
        }, 3000);
    }
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}