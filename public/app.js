/**
 * Elementor AI Builder - Frontend Logic
 * Responsável por integrar a interface com a API de geração.
 */

// Variável global para armazenar o JSON gerado
let generatedDocument = null;

// Seleção de elementos do DOM
const promptInput = document.getElementById('prompt');
const templateSelect = document.getElementById('template');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const statusArea = document.getElementById('statusArea');
const statusMessage = document.getElementById('statusMessage');
const loader = document.querySelector('.loader');
const API_PORT = '3333';
const API_BASE_URL = window.location.port === API_PORT ? '' : `http://localhost:${API_PORT}`;

/**
 * Atualiza a interface de status
 */
function updateStatus(message, type = 'info') {
    statusArea.classList.remove('hidden', 'error', 'success');
    loader.classList.add('hidden');
    
    statusMessage.textContent = message;
    
    if (type === 'error') statusArea.classList.add('error');
    if (type === 'success') statusArea.classList.add('success');
    if (type === 'loading') {
        loader.classList.remove('hidden');
    }
}

/**
 * Função para gerar a página via API
 */
async function generatePage() {
    const prompt = promptInput.value.trim();
    const template = templateSelect.value;

    // Validação básica
    if (!prompt) {
        updateStatus('Por favor, descreva o conteúdo da sua landing page.', 'error');
        return;
    }

    // Reset de estado
    generatedDocument = null;
    downloadBtn.disabled = true;
    updateStatus('Aguarde, a IA está desenhando sua página...', 'loading');
    generateBtn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, template })
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Erro HTTP ${response.status}`;

            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.error || errorMessage;
            } catch {
                if (errorText.trim()) {
                    errorMessage = errorText.trim();
                }
            }

            throw new Error(errorMessage);
        }

        const text = await response.text();
        generatedDocument = JSON.parse(text);
        downloadBtn.disabled = false;
        updateStatus('Página gerada com sucesso! Clique em "Baixar JSON" para salvar.', 'success');

    } catch (error) {
        console.error('Erro no processamento:', error);
        updateStatus(`Erro: ${error.message}`, 'error');
    } finally {
        generateBtn.disabled = false;
    }
}

/**
 * Função para baixar o arquivo JSON no navegador
 */
function downloadJson() {
    if (!generatedDocument) return;

    try {
        const jsonString = JSON.stringify(generatedDocument, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'pagina-elementor.json';
        
        document.body.appendChild(link);
        link.click();
        
        // Limpeza
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        updateStatus('Erro ao criar arquivo de download.', 'error');
    }
}

// Event Listeners
generateBtn.addEventListener('click', generatePage);
downloadBtn.addEventListener('click', downloadJson);
