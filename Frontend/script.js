document.getElementById('infoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const full_name = document.getElementById('full_name').value;
    const education = document.getElementById('education').value;
    const age = document.getElementById('age').value;
    const mobile_no = document.getElementById('mobile_no').value;
    const city = document.getElementById('city').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('http://localhost:3000/api/addInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ full_name, education, age, mobile_no, city })
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.textContent = result.message;
            responseMessage.style.color = 'green';
            document.getElementById('infoForm').reset();
        } else {
            responseMessage.textContent = result.error || 'Failed to add information';
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        responseMessage.textContent = 'Error: Unable to connect to the server';
        responseMessage.style.color = 'red';
    }
});

document.getElementById('fetchDataButton').addEventListener('click', async function () {
    const infoTableBody = document.getElementById('infoTable').getElementsByTagName('tbody')[0];

    try {
        const response = await fetch('http://localhost:3000/api/getInfo');
        const data = await response.json();

        // Clear previous data
        infoTableBody.innerHTML = '';

        data.forEach(info => {
            const row = infoTableBody.insertRow();

            row.insertCell(0).textContent = info.full_name;
            row.insertCell(1).textContent = info.education;
            row.insertCell(2).textContent = info.age;
            row.insertCell(3).textContent = info.mobile_no;
            row.insertCell(4).textContent = info.city;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
