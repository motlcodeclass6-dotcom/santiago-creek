document.querySelectorAll('.card').forEach(card => {
    const p = card.querySelector('p');
    const h2 = card.querySelector('h2');
    if (!p || !h2) return;
  
    // 1. Get the available vertical space inside the card
    const cardRect = card.getBoundingClientRect();
    const h2Rect = h2.getBoundingClientRect();
    const cardStyle = window.getComputedStyle(card);
    
    const paddingY = parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom);
    
    // Available height = Total card height - H2 height - padding - border - small buffer
    const availableHeight = cardRect.height - h2Rect.height - paddingY - 10; 
  
    let minW = 150; 
    let maxW = 600; // Adjust based on your layout's maximum allowable width
    let optimalW = maxW;
  
    p.style.display = "block";
    p.style.margin = "0";
  
    // Binary search to find the narrowest width that fits availableHeight
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
  
    p.style.width = (optimalW + 2) + 'px';
  });
  