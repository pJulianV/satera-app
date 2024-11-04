// frontend/script.js
const API_URL = 'https://my-node-app-9ltv.onrender.com/api/medicamentos'; // Cambiado a la URL de Render

document.getElementById('medicamentoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreMedicamento = document.getElementById('nombreMedicamento').value;
    const precio = document.getElementById('precio').value;
    const unidadesRestantes = document.getElementById('unidadesRestantes').value;

    try {
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
        } else {
            console.error('Error al crear medicamento:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

async function loadMedicamentos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al cargar medicamentos: ' + response.statusText);
        }
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
    } catch (error) {
        console.error('Error al cargar medicamentos:', error);
    }
}

// Cargar los medicamentos al inicio
loadMedicamentos();