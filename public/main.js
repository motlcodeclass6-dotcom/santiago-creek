const fitCards = () => {
    document.querySelector('#flexwrap').classList.add("hide")
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      const p = card.querySelector('p');
      const h2 = card.querySelector('h2');
      if (!p || !h2){
        card.classList.add("show")
        return;
      }
  
      // 1. Reset P width to find the natural expansion first
      p.style.width = 'auto';
      p.style.display = "block";
      p.style.margin = "0";
  
      // 2. Calculate usable height inside the card
      const cardStyle = window.getComputedStyle(card);
      const paddingY = parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom);
      
      // Use offsetHeight to get the full stretched height of the flex card
      const availableHeight = card.offsetHeight - h2.offsetHeight - paddingY - 15; 
  
      // 3. Binary Search
      let minW = 200; 
      let maxW = 1200; // Increased to handle long text like "What You Can Do"
      let optimalW = maxW;
  
      while (minW <= maxW) {
        let mid = Math.floor((minW + maxW) / 2);
        p.style.width = mid + 'px';
  
        if (p.scrollHeight <= availableHeight) {
          optimalW = mid;
          maxW = mid - 1;
        } else {
          minW = mid + 1;
        }
      }
  
      // 4. Final Application
      p.style.width = (optimalW + 4) + 'px';
      card.classList.add("show")
    });
  };
  
  // Run after all cards have settled into their flex heights
  window.addEventListener('load', fitCards);
  