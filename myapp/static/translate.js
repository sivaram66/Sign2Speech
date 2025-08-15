document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('videoFeed');
    const startButton = document.getElementById('startCamera');
    const translationText = document.getElementById('translationText');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');

    let stream = null;
    let isProcessing = false;

    // Add loading animation
    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        document.body.appendChild(loading);
        return loading;
    }

    // Start camera with loading animation
    startButton.addEventListener('click', async () => {
        const loading = showLoading();
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            videoElement.srcObject = stream;
            await videoElement.play();
            startButton.style.display = 'none';
            
            // Simulate AI processing
            simulateTranslation();
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Unable to access camera. Please ensure you have granted camera permissions.');
        } finally {
            loading.remove();
        }
    });

    // Enhanced translation simulation with more realistic phrases and timing
    function simulateTranslation() {
        const phrases = [
            "Hello! Nice to meet you.",
            "How are you doing today?",
            "I'm learning sign language.",
            "Thank you for your help!",
            "Can you please repeat that?",
            "I understand what you're saying.",
            "Would you like some coffee?",
            "Have a wonderful day!"
        ];
        
        let index = 0;
        setInterval(() => {
            // Simulate processing state
            isProcessing = true;
            translationText.classList.add('processing');
            
            // Random delay between 1-3 seconds for more realistic AI processing
            setTimeout(() => {
                translationText.textContent = phrases[index];
                translationText.classList.remove('processing');
                isProcessing = false;
                index = (index + 1) % phrases.length;
            }, Math.random() * 2000 + 1000);
        }, 4000);
    }

    // Enhanced download functionality with proper naming
    downloadBtn.addEventListener('click', () => {
        if (isProcessing || !translationText.textContent) return;
        
        const text = translationText.textContent;
        const date = new Date().toISOString().slice(0, 10);
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sign-translation-${date}.txt`;
        
        // Add success feedback
        downloadBtn.style.opacity = '0.7';
        setTimeout(() => downloadBtn.style.opacity = '1', 200);
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Enhanced share functionality with fallback
    shareBtn.addEventListener('click', async () => {
        if (isProcessing || !translationText.textContent) return;
        
        const text = translationText.textContent;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Sign Language Translation',
                    text: text
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                    fallbackShare(text);
                }
            }
        } else {
            fallbackShare(text);
        }
    });

    // Fallback sharing method
    function fallbackShare(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Translation copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Unable to copy translation');
        }
        document.body.removeChild(textarea);
    }

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    });

    // Handle visibility change to pause/resume processing
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && stream) {
            stream.getTracks().forEach(track => track.enabled = false);
        } else if (stream) {
            stream.getTracks().forEach(track => track.enabled = true);
        }
    });
});