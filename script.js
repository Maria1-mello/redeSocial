document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleção dos elementos no DOM
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".post-actions > .action-btn");

    if (!likeBtn) return;

    const likeSvg = likeBtn.querySelector("svg");

    // Procura pelo nó de texto dentro do botão da curtida
    let textNode = Array.from(likeBtn.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    // 2. Estado Inicial (Inicia zerado)
    let baseLikes = 0;
    let isLiked = false;

    if (textNode) {
        textNode.textContent = " 0";
    }

    // 3. Formatação de Números (ex: 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return " " + (num / 1000).toFixed(1) + "K";
        }
        return " " + num.toString();
    }

    // 4. Efeito de Animação (Bounce) no Ícone
    function animateHeart() {
        if (likeSvg) {
            likeSvg.style.transform = "scale(1.3)";
            setTimeout(() => {
                likeSvg.style.transform = "scale(1)";
            }, 150);
        }
    }

    // 5. Atualiza o Estado Visual e Numérico
    function updateUI() {
        if (isLiked) {
            likeBtn.classList.add("liked");
            likeSvg.style.fill = "#ef4444";
            likeSvg.style.stroke = "#ef4444";
        } else {
            likeBtn.classList.remove("liked");
            likeSvg.style.fill = "none";
            likeSvg.style.stroke = "currentColor";
        }

        if (textNode) {
            textNode.textContent = formatLikes(baseLikes);
        }

        animateHeart();
    }

    // 6. Adiciona uma curtida
    function addLike() {
        baseLikes++;
        isLiked = true;
        updateUI();
    }

    // --- EVENTOS ---

    // Clique no Ícone do Coração (Curte / Descurte)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (isLiked) {
            isLiked = false;
            baseLikes = Math.max(0, baseLikes - 1);
            updateUI();
        } else {
            addLike();
        }
    });

    // Clique na Imagem Principal (Sempre incrementa)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Clique no Ícone de Salvar (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }
});