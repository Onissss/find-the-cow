const easyBtn = document.getElementById('easy')
const mediumBtn = document.getElementById('medium')
const hardBtn = document.getElementById('hard')

easyBtn.addEventListener('click', () => {
    localStorage.setItem('difficulty', 'easy')
})
mediumBtn.addEventListener('click', () => {
    localStorage.setItem('difficulty', 'medium')
})
hardBtn.addEventListener('click', () => {
    localStorage.setItem('difficulty', 'hard')
})