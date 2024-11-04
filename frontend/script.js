// frontend/script.js
const API_URL = 'http://localhost:5000/api/medicamentos';

document.getElementById('medicamentoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreMedicamento = document.getElementById('nombreMedicamento').value;
    const precio = document.getElementById('precio').value;
    const unidadesRestantes = document.getElementById('unidadesRestantes').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombreMedicamento,
            precio,
            unidadesRestantes
        })
    });

    if (response.ok) {
        document.getElementById('medicamentoForm').reset();
        loadMedicamentos();
    }
});

async function loadMedicamentos() {
    const response = await fetch(API_URL);
    const medicamentos = await response.json();
    const medicamentosList = document.getElementById('medicamentosList');
    medicamentosList.innerHTML = '';

    medicamentos.forEach(medicamento => {
        const li = document.createElement('li');
        li.textContent = `${medicamento.nombreMedicamento} - Precio: ${medicamento.precio} - Unidades: ${medicamento.unidadesRestantes}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = async () => {
            await fetch(`${API_URL}/${medicamento._id}`, { method: 'DELETE' });
            loadMedicamentos();
        };
        
        li.appendChild(deleteButton);
        medicamentosList.appendChild(li);
    });
}

// Cargar los medicamentos al inicio
loadMedicamentos();