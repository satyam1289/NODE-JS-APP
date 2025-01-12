const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

getData();

filter.addEventListener('input', (e) => filterData(e.target.value));

async function getData() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const results = await res.json();
        
        // Clear loading
        result.innerHTML = '';
        
        results.forEach(user => {
            const li = document.createElement('li');
            
            li.innerHTML = `
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p class="email"><i class="fas fa-envelope"></i> ${user.email}</p>
                    <p class="phone"><i class="fas fa-phone"></i> ${user.phone}</p>
                    <p class="company"><i class="fas fa-building"></i> ${user.company.name}</p>
                    <p class="address"><i class="fas fa-map-marker-alt"></i> ${user.address.suite}, ${user.address.street}, ${user.address.city}</p>
                    <p class="website"><i class="fas fa-globe"></i> ${user.website}</p>
                </div>
            `;

            listItems.push(li);
            result.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        result.innerHTML = '<li>Error loading users</li>';
    }
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
}
