document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const carBlocks = document.querySelectorAll('.car-block');
    const noResultsMessage = document.getElementById('no-results-message');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase().trim();
            let hasResults = false;

            carBlocks.forEach(block => {
                const searchData = block.getAttribute('data-name');
                if (searchData.includes(value)) {
                    block.style.display = 'block';
                    hasResults = true;
                } else {
                    block.style.display = 'none';
                }
            });

            if (hasResults) {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            }
        });
    }
});