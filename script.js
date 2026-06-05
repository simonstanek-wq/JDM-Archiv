document.addEventListener('DOMContentLoaded', () => {
    const carsList = document.getElementById('cars-list');
    const carBlocks = document.querySelectorAll('.car-block');
    const searchInput = document.getElementById('search-input');
    
    const totalCars = carBlocks.length;
    const anglePerCar = 360 / totalCars; // Automaticky spoèítá úhel pro libovolný poèet aut
    let currentIndex = 0;

    function updateCylinder() {
        carsList.style.transform = `rotateX(${currentIndex * anglePerCar}deg)`;
        let activeIndex = (-currentIndex % totalCars + totalCars) % totalCars;

        carBlocks.forEach((block, idx) => {
            block.classList.remove('active', 'neighbor');
            if (idx === activeIndex) {
                block.classList.add('active');
            } else if (
                idx === (activeIndex + 1) % totalCars || 
                idx === (activeIndex - 1 + totalCars) % totalCars
            ) {
                block.classList.add('neighbor');
            }
        });
    }

    updateCylinder();

    // TOÈENÍ KOLEÈKEM MYŠI
    window.addEventListener('wheel', (e) => {
        if (modal.classList.contains('show')) return;

        if (e.deltaY > 0) {
            currentIndex--;
        } else {
            currentIndex++;
        }
        updateCylinder();
        e.preventDefault();
    }, { passive: false });

    // VYHLEDÁVAÈ
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase().trim();
            if (value === '') return;

            for (let i = 0; i < carBlocks.length; i++) {
                const searchData = carBlocks[i].getAttribute('data-name');
                if (searchData.includes(value)) {
                    let activeIndex = (-currentIndex % totalCars + totalCars) % totalCars;
                    let diff = i - activeIndex;
                    if (diff > totalCars / 2) diff -= totalCars;
                    if (diff < -totalCars / 2) diff += totalCars;
                    
                    currentIndex -= diff;
                    updateCylinder();
                    break;
                }
            }
        });
    }

    // DETAILNÍ MODAL OKNO
    const modal = document.getElementById('car-detail-modal');
    const modalContent = document.getElementById('modal-dynamic-content');
    const closeBtn = document.querySelector('.close-modal');

    carBlocks.forEach(block => {
        block.addEventListener('click', () => {
            if (block.classList.contains('active')) {
                const title = block.querySelector('h2').innerHTML;
                const years = block.querySelector('.car-years').innerHTML;
                const imgSrc = block.querySelector('.car-img').src;
                const fullDetailsHtml = block.querySelector('.hidden-details').innerHTML;

                modalContent.innerHTML = `
                    <h2>${title}</h2>
                    <span class="car-years">${years}</span>
                    <img src="${imgSrc}" class="modal-large-img" alt="Detail">
                    ${fullDetailsHtml}
                `;

                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
            }
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalContent.innerHTML = '';
        }, 300);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});