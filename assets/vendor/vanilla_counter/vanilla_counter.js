function VanillaCounter() {
    let elements = document.querySelectorAll('[data-vanilla-counter]');
  
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let i = entry.target;
  
          let data = {
            startAt: parseInt(i.getAttribute('data-start-at')),
            endAt: parseInt(i.getAttribute('data-end-at')),
            delay: parseInt(i.getAttribute('data-delay')) || 0,
            format: '{}',
            time: parseInt(i.getAttribute('data-time')) || 1000
          };
  
          if (i.getAttribute('data-format')) {
            data.format = i.getAttribute('data-format');
          } else if (i.innerHTML.trim() !== "") {
            data.format = i.innerHTML;
          }
  
          if (data.startAt == null || data.endAt == null) {
            throw new Error('data-start-at and data-end-at attributes are required');
          }
  
          let counter = data.startAt;
          i.innerHTML = data.format.replace('{}', counter);
          let intervalTime = Math.ceil(data.time / (data.endAt - data.startAt));
  
          setTimeout(() => {
            let interval = setInterval(intervalHandler, intervalTime);
  
            function intervalHandler() {
              counter += (data.endAt > data.startAt ? 1 : -1);
              i.innerHTML = data.format.replace('{}', counter);
  
              if (counter === data.endAt) {
                clearInterval(interval);
              }
            }
          }, data.delay);
  
          // Stop observing after it has run once
          observer.unobserve(i);
        }
      });
    }, { threshold: 0.3 }); // start counting when 30% of element is visible
  
    elements.forEach(i => observer.observe(i));
  }
  
  window.VanillaCounter = VanillaCounter;
  