const addReviewPage = document.getElementById("add-review-page");
const viewReviewsPage = document.getElementById("view-reviews-page");
const productNameInput = document.getElementById("product-name");
const reviewTextInput = document.getElementById("review-text");
const addReviewBtn = document.getElementById("add-review-btn");
const productList = document.getElementById("product-list");
const showListBtn = document.getElementById("show-list-btn");

// Обработчик клика на кнопку "Добавить отзыв"
addReviewBtn.addEventListener('click', () => {
    const productName = productNameInput.value;
    const reviewText = reviewTextInput.value;
  
    // Проверяем, есть ли уже отзывы о данном продукте в LocalStorage
    let reviews = localStorage.getItem(productName);
    if (reviews) {
      reviews = JSON.parse(reviews);
      reviews.push(reviewText);
    } else {
      reviews = [reviewText];
    }
  
    // Сохраняем обновленные отзывы в LocalStorage
    localStorage.setItem(productName, JSON.stringify(reviews));
  
    // Очищаем поля ввода
    productNameInput.value = '';
    reviewTextInput.value = '';
  
    // Переключаемся на страницу просмотра отзывов
    showReviewsPage();
  });

 showListBtn.addEventListener("click", showReviewsPage); 
 
  // Функция для отображения страницы просмотра отзывов
  function showReviewsPage() {
    addReviewPage.style.display = 'none';
    viewReviewsPage.style.display = 'block';
  
    // Очищаем список продуктов
    productList.innerHTML = '';
  
    // Получаем все ключи (названия продуктов) из LocalStorage
    const productNames = Object.keys(localStorage);
  
    // Для каждого названия продукта создаем элемент списка
    productNames.forEach((productName) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = productName;
      link.href = '#';
  
      // Обработчик клика на название продукта
      link.addEventListener('click', () => {
        showReviewsForProduct(productName);
      });
  
      listItem.appendChild(link);
      productList.appendChild(listItem);
    });
  }
  
  // Функция для отображения отзывов по выбранному продукту
  function showReviewsForProduct(productName) {
    // Очищаем список продуктов
    productList.innerHTML = '';
  
    const reviews = JSON.parse(localStorage.getItem(productName));
  
    // Создаем элементы списка для каждого отзыва
    reviews.forEach((reviewText) => {
      const listItem = document.createElement('li');
      listItem.textContent = reviewText;
  
      // Кнопка "Удалить"
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.addEventListener('click', () => {
        deleteReview(productName, reviewText);
        showReviewsForProduct(productName); // Обновляем отображение отзывов
      });
  
      listItem.appendChild(deleteButton);
      productList.appendChild(listItem);
    });
  }
  
  // Функция для удаления отзыва
  function deleteReview(productName, reviewText) {
    const reviews = JSON.parse(localStorage.getItem(productName));
    const updatedReviews = reviews.filter((review) => review !== reviewText);
    localStorage.setItem(productName, JSON.stringify(updatedReviews));
  }
  
  // Показываем страницу добавления отзыва при загрузке
  addReviewPage.style.display = 'block';
  viewReviewsPage.style.display = 'none';