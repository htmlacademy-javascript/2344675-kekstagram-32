import {mockPosts} from './mock-generation.js';
import {posts} from './draw-thumbs.js';

const fullPhoto = document.querySelector('.big-picture');
const pageBody = document.querySelector('body');
const fullPhotoBtnCancel = document.querySelector('.big-picture__cancel');

const commentsLoadPortion = 5;
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsShowmoreButton = fullPhoto.querySelector('.social__comments-loader');

const closeModal = () => {
  pageBody.classList.remove('modal-open');
  fullPhoto.classList.add('hidden');
  // document.removeEventListener('keydown', onCloseModalEsc);
  // fullPhotoBtnCancel.removeEventListener('click', onCloseModalBtn);
};

const onCloseModalEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    // pageBody.classList.remove('modal-open');
    // fullPhoto.classList.add('hidden');
    // document.removeEventListener('keydown', onCloseModalEsc);
    // fullPhotoBtnCancel.removeEventListener('click', onCloseModalBtn);
  };
};

const onCloseModalBtn = () => {
  closeModal();
  // pageBody.classList.remove('modal-open');
  // fullPhoto.classList.add('hidden');
  // document.removeEventListener('keydown', onCloseModalEsc);
  // fullPhotoBtnCancel.removeEventListener('click', onCloseModalBtn);
};

const drawFullPhoto = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    const thisId = evt.target.dataset.id;
    (fullPhoto.querySelector('.big-picture__img img')).src = mockPosts[thisId - 1].url;
    (fullPhoto.querySelector('.social__caption')).textContent = mockPosts[thisId - 1].description;
    (fullPhoto.querySelector('.likes-count')).textContent = mockPosts[thisId - 1].likes;
    (fullPhoto.querySelector('.social__comment-total-count')).textContent = mockPosts[thisId - 1].comments.length;


    // показ комментариев
    //+1. Очищаем commentsList (Node) (изначально в нем дефолтные комментарии, в рабочем режиме - с предыдущего фото)
    //+2. commentsShown = 0 (Number)
    //+3. Получаем все комментарии commentsAll (Array) из записи этой фотографии в mockPosts
    //+4. если commentsAll.length > 0, то показываем кнопку, иначе скрываем кнопку

    // процедура подгрузки следующих комментариев [вынести наверх модуля? Но используется commentsShown.]
    // 5. commentsToShow = commentsAll.slice(commentsShown, commentsShown + commentsLoadPortion); (Array)
    // 6. если commentsToShow.length > 0, то {
    // 6.1. commentsToShow.forEach(current) {
    // 6.2.   наполняем newComment (Node) из current (Array[_])
    // 6.2.   добавляем newComment к commentsList
    //      }
    //    }
    // 6.2. commentsShown += commentsToShow.length
    // 7. если commentsShown === commentsAll.length (больше нет комментариев к показу) - скрываем кнопку

    // 9. вешаем на кнопку процедуру подгрузки следующих комментариев

    let drawnComments = fullPhoto.querySelectorAll('.social__comment');
    console.log(`Уже есть комментарии, ${drawnComments.length} шт:`);
    console.log(drawnComments);
    drawnComments.forEach((comment) => {
      console.log(comment);
      comment.remove();
    });

    let commentsShown = 0;
    const commentsAll = mockPosts[thisId - 1].comments; // (Collection)
    if (commentsAll.length === 0) {
      commentsShowmoreButton.hidden = true;
    } else {
      commentsShowmoreButton.hidden = false;
    };

    console.log('Все комментарии к этому фото из генерации:');
    console.log(commentsAll);

    console.log('НАПОЛНЕНИЕ КОММЕНТАРИЕВ:');
    let counter = 0;
    commentsAll.forEach((comment) => {
      commentTemplate.querySelector('.social__picture').src = mockPosts[thisId - 1].comments[counter].avatar;
      commentTemplate.querySelector('.social__picture').alt = mockPosts[thisId - 1].comments[counter].name;
      commentTemplate.querySelector('.social__text').textContent = mockPosts[thisId - 1].comments[counter].message;

      console.log('Комментарий после заполнения:');
      console.log(comment);
      console.log(commentTemplate);

      const newComment = commentTemplate;
      commentsList.appendChild(newComment); // ?? Добавляется только последний
      console.log('комментарий добавлен');
      counter++;
    });


    pageBody.classList.add('modal-open');
    fullPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onCloseModalEsc, {once: true});
    fullPhotoBtnCancel.addEventListener('click', onCloseModalBtn, {once: true});
  }
};
posts.addEventListener('click', drawFullPhoto);
