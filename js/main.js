(function() {

  const searchInput = document.querySelector('.search-input');
  const closeSearchInput = document.querySelector('.fa-times-circle');
  const searchPlaceholder = document.querySelector('.search-placeholder');

  const feedImg = document.querySelector('.feed-img');
  const heartIcon = document.querySelector('.left-icons .fa-heart');

  const commentInput = document.querySelector('.input-comment');
  const commentUploadBtn = document.querySelector('.upload-comment');
  const commentContainer = document.querySelector('.comment-container');

  searchInput.addEventListener('focus', () => {
    movingPlaceholder();
  });

  searchInput.addEventListener('keydown', () => {
    searchPlaceholder.style.display = 'none';
  });

  closeSearchInput.addEventListener('click', () => {
    movingPlaceholder();
    searchPlaceholder.innerHTML = '검색';
  });

  const movingPlaceholder = () => {
    const searchIcon = document.querySelector('.fa-search');

    if (closeSearchInput.style.display === 'none') {
      closeSearchInput.style.display = 'block';
      searchPlaceholder.style.left = 27 + 'px';
      searchIcon.style.left = 10 + 'px';
    } else {
      searchPlaceholder.style.left = 95 + 'px';
      searchIcon.style.left = 80 + 'px';
      closeSearchInput.style.display = 'none';
    }
  };

  let count = 0;
  const likeAnimation = () => {
    const countLikes = document.querySelector('.count-likes');
    const heartAction = document.querySelector('.heart-action');
  
    count++;
    countLikes.innerHTML = count;

    if (heartIcon.classList[0] === 'far') {
      heartIcon.classList.replace('far', 'fas');
      heartIcon.style.color = 'rgb(255, 87, 87)';  
    } else if (heartIcon.classList[0] === 'fas') {
      heartIcon.classList.replace('fas', 'far');
      heartIcon.style.color = 'rgba(0, 0, 0, 0.8)';  
    }

    heartAction.classList.add('animate-like');
    setTimeout(() => {
      heartAction.classList.remove('animate-like');
    }, 800);
  };

  feedImg.addEventListener('dblclick', () => {
    likeAnimation();
  });

  heartIcon.addEventListener('click', () => {
    likeAnimation();
  });

  commentInput.addEventListener('keyup', (e) => {

    if (e.keyCode !== 13) {
      checkComment();
    } else if (e.keyCode === 13 && e.target.value.length !== 0) {
      writeComment();
      commentInput.value = '';
    }
  });

  commentUploadBtn.addEventListener('click', () => {
    writeComment();
    commentInput.value = '';
  });

  commentContainer.addEventListener('click', (e) => {
    document.querySelectorAll('div').forEach((v) => {
      v.innerHTML === '삭제' ? console.log('이거 삭제') : '';
      if (e.target.innerHTML === v.innerHTML) {
        const comment = v.parentElement;
        v.parentElement.parentElement.removeChild(comment);
      }
    });
    // console.log(e.target.innerHTML);  
  });

  const checkComment = () => {
    if (commentInput.value.length >= 1) {
      commentUploadBtn.disabled = false;
      commentUploadBtn.style.opacity = 1;
      commentUploadBtn.style.cursor = 'pointer';
    } else if (commentInput.value.length === 0) {
      commentUploadBtn.disabled = true;
      commentUploadBtn.style.opacity = 0.3;
    }
  };

  const writeComment = () => {
    const commentWrapper = document.createElement('div');
    const newComment = document.createElement('span');
    const commentDeleteBtn = document.createElement('div');
    
    commentWrapper.classList.add('comment-wrapper');
    newComment.classList.add('comment');
    commentDeleteBtn.classList.add('delete-comment');

    commentWrapper.appendChild(newComment);
    commentWrapper.appendChild(commentDeleteBtn);
    commentContainer.appendChild(commentWrapper);

    commentDeleteBtn.innerHTML = '삭제';
    newComment.innerHTML = commentInput.value.trim();
    checkComment();
  };


  
  const updateCopyrightYear = () => {
    const copyrightYear = document.querySelector('.copyright-year');
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = currentYear;
  };
  updateCopyrightYear();

})();