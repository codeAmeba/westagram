(function() {

  const searchInput = document.querySelector('.search-input');
  const closeSearchInput = document.querySelector('.fa-times-circle');
  const searchPlaceholder = document.querySelector('.search-placeholder');
  const searchkeywordList = document.querySelector('.search-keyword');
  const searchIcon = document.querySelector('.fa-search');

  const feedImg = document.querySelector('.feed-img');
  const heartIcon = document.querySelector('.left-icons .fa-heart');

  const commentInput = document.querySelector('.input-comment');
  const commentUploadBtn = document.querySelector('.upload-comment');
  const commentContainer = document.querySelector('.comment-container');

  const searchKeywords = ['apple', 'apeach', 'ryan', 'prodo', 'neo', 'muji', 'kon', 'tube', 'aprilgreenery', 'dlwlrma', 'wecode'];
  const foundKeywords = [];

  searchInput.addEventListener('focus', () => {
    movingPlaceholder();
  });

  let timeout = null;
  searchInput.addEventListener('keyup', (e) => {
    searchPlaceholder.style.display = 'none';
    searchIcon.style.display = 'none';
    clearTimeout(timeout);
    const inputValue = e.target.value;

    timeout = setTimeout(() => {
      if (inputValue !== '') {
        searchKeywords
        .filter((keyword) => keyword.toLowerCase().includes(inputValue.toLowerCase()))
        .forEach((keyword) => {
          if (foundKeywords.indexOf(keyword) === -1) {
            foundKeywords.push(keyword);
            searchkeywordList.appendChild(searchKeywordResult(keyword));
          }
        });
      }
    }, 500);

    if (inputValue === '') {
      foundKeywords.splice(0, foundKeywords.length);
      searchkeywordList.innerHTML = '';
      searchkeywordList.classList.remove('search-keyword-active');
    }
  });

  document.querySelectorAll('.keyword').forEach((result) => {
    result.addEventListener('click', () => {
      searchInput.value = result.innerHTML;
      foundKeywords.splice(0, foundKeywords.length);
      searchkeywordList.innerHTML = '';
      searchkeywordList.classList.remove('search-keyword-active');
    });
  });

  closeSearchInput.addEventListener('click', () => {
    movingPlaceholder();
    searchPlaceholder.innerHTML = '검색';
  });

  const movingPlaceholder = () => {
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

  const searchKeywordResult = (keyword) => {
    const result = document.createElement('li');
    result.classList.add('keyword');
    result.innerHTML = keyword;
    searchkeywordList.classList.add('search-keyword-active');
    return result;
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
      if (e.target.innerHTML === v.innerHTML && e.target.previousSibling.innerHTML === v.previousSibling.innerHTML) {
        const comment = v.parentElement;
        v.parentElement.parentElement.removeChild(comment);
      }
    });
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