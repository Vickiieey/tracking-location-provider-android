// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.product-card, .feature, .contact-item, .about-text, .about-image');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Product Card Interactions
document.querySelectorAll('.product-card').forEach(card => {
    const colorDots = card.querySelectorAll('.color-dot');
    const productImage = card.querySelector('.product-img-placeholder');
    
    colorDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove active class from all dots in this card
            colorDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Change product image background based on color
            const color = window.getComputedStyle(dot).backgroundColor;
            productImage.style.background = `linear-gradient(45deg, ${color}, ${color}99)`;
            
            // Add a subtle animation
            productImage.style.transform = 'scale(0.95)';
            setTimeout(() => {
                productImage.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    });
}

// CTA Button Animation
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Scroll to products section
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            const headerOffset = 70;
            const elementPosition = productsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Quick View Modal Functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        showQuickViewModal(productName, productPrice);
    });
});

// Quick View Modal
function showQuickViewModal(name, price) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('#quick-view-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-body">
                    <div class="modal-image">
                        <div class="modal-img-placeholder">Product Image</div>
                    </div>
                    <div class="modal-info">
                        <h2 class="modal-product-name">${name}</h2>
                        <p class="modal-product-price">${price}</p>
                        <div class="size-selector">
                            <h4>Size:</h4>
                            <div class="size-options">
                                <button class="size-btn">7</button>
                                <button class="size-btn">8</button>
                                <button class="size-btn active">9</button>
                                <button class="size-btn">10</button>
                                <button class="size-btn">11</button>
                            </div>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background-color: white;
                margin: 5% auto;
                border-radius: 15px;
                width: 90%;
                max-width: 800px;
                position: relative;
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                position: absolute;
                right: 20px;
                top: 15px;
                cursor: pointer;
            }
            
            .close:hover { color: black; }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                padding: 2rem;
            }
            
            .modal-img-placeholder {
                width: 100%;
                height: 300px;
                background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                color: #666;
            }
            
            .modal-product-name {
                font-size: 2rem;
                margin-bottom: 1rem;
                color: #2c3e50;
            }
            
            .modal-product-price {
                font-size: 1.5rem;
                color: #e74c3c;
                font-weight: 700;
                margin-bottom: 2rem;
            }
            
            .size-selector h4 {
                margin-bottom: 1rem;
                color: #2c3e50;
            }
            
            .size-options {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 2rem;
            }
            
            .size-btn {
                padding: 10px 15px;
                border: 2px solid #ddd;
                background: white;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .size-btn:hover, .size-btn.active {
                border-color: #3498db;
                color: #3498db;
            }
            
            .add-to-cart-btn {
                background: #3498db;
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 1.1rem;
                font-weight: 600;
                border-radius: 10px;
                cursor: pointer;
                width: 100%;
                transition: background 0.3s ease;
            }
            
            .add-to-cart-btn:hover {
                background: #2980b9;
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                    padding: 1rem;
                }
                
                .modal-content {
                    margin: 10% auto;
                    width: 95%;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    } else {
        modal.querySelector('.modal-product-name').textContent = name;
        modal.querySelector('.modal-product-price').textContent = price;
    }
    
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Size selection
    modal.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Add to cart functionality
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = modal.querySelector('.size-btn.active').textContent;
        showNotification(`${name} (Size ${selectedSize}) added to cart!`, 'success');
        modal.style.display = 'none';
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification if it doesn't exist
    let notification = document.querySelector('#notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Add notification styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 600;
                z-index: 3000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            
            .notification.success {
                background: #27ae60;
            }
            
            .notification.error {
                background: #e74c3c;
            }
            
            .notification.info {
                background: #3498db;
            }
            
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to product images
    const productImages = document.querySelectorAll('.product-img-placeholder');
    productImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.animation = 'pulse 2s infinite';
        }, index * 200);
    });
    
    // Initialize color dots
    document.querySelectorAll('.product-card').forEach(card => {
        const firstColorDot = card.querySelector('.color-dot');
        if (firstColorDot) {
            firstColorDot.classList.add('active');
        }
    });
    
    console.log('StepForward website loaded successfully! 👟');
});