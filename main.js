const destinations = [
    {
        name: '서울',
        image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        description: '대한민국의 수도이자 역사와 현대가 공존하는 도시입니다.'
    },
    {
        name: '부산',
        image: 'https://images.unsplash.com/photo-1588809633973-51475713597a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        description: '아름다운 해변과 활기찬 시장이 있는 대한민국의 제2의 도시입니다.'
    },
    {
        name: '제주도',
        image: 'https://images.unsplash.com/photo-1579169825453-8d4b452e1a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        description: '화산섬으로 독특한 자연 경관과 문화를 자랑하는 대한민국의 대표적인 휴양지입니다.'
    }
];

const destinationsContainer = document.getElementById('destinations-container');

destinations.forEach(destination => {
    const card = document.createElement('div');
    card.classList.add('destination-card');

    const image = document.createElement('img');
    image.src = destination.image;
    image.alt = destination.name;

    const content = document.createElement('div');
    content.classList.add('destination-card-content');

    const title = document.createElement('h2');
    title.textContent = destination.name;

    const description = document.createElement('p');
    description.textContent = destination.description;

    content.appendChild(title);
    content.appendChild(description);
    card.appendChild(image);
    card.appendChild(content);

    destinationsContainer.appendChild(card);
});
