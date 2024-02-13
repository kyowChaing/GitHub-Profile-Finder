

 const CLIENT_ID='e30a232b3a69237028cb';
 const CLIENT_SECRET ='9025619286a55edc7881ca87528f3171663a1586';

//this code block show by default My GitHub Link profile when page reload
 let show=true;
myProfile(show);
async function myProfile(show){
    if (show) {
        document.querySelector('#findByUsername').focus();
        const myprofile= await fetch(`https://api.github.com/users/KyowChaing?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
        const profile= await myprofile.json()
        showProfile(profile);
        const repLst= await getRepository(profile);
        showRepository(repLst);
    } else {
        document.querySelector('.user-details').style.display="none";
    }
}
 


//fetch data according user search by from submit [add event listener]

document.querySelector('#search').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const userName=document.querySelector('#findByUsername').value;
    if (userName.length>0) {
      document.querySelector('.loader').style.display='block';  //adding loader to show during fetching data
      document.querySelector('.user-details').style.display='none'; //hidding user-details UI during loading
      document.querySelector('.notFound').style.display='none';  //hidding user-details UI during loading

      const profile = await getUser(userName);
      document.querySelector('.loader').style.display='none';  //hidding  loader after  fetching data
       
      if(profile.message==="Not Found"){
            document.querySelector('.notFound').style.display='block';
            const userExist= false;
            myProfile(userExist);
        }else{
            showProfile(profile);
            document.querySelector('.user-details').style.display='flex';//making display none to flex
            const repLst= await getRepository(profile);
            showRepository(repLst);
        }
        document.querySelector('#findByUsername').value='';  //input form reset
    }

});


//get github user Profile Information
async function getUser(name){
    const resposnse= await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const profile=await resposnse.json();
    return profile;
}
//Show profile into UI dynamically

function showProfile(profile){
    document.querySelector('.profile').innerHTML=`
        <img
            src="${profile.avatar_url}"
            alt="${profile.name}"
          />
          <p class="name">${profile.name}</p>
          <p class="username login">${profile.login}</p>
          <p class="bio">
            ${profile.bio}
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> ${profile.followers}</span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> ${profile.following}</span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            ${profile.company}
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>${profile.location}
          </p>`;
}

//Get repository list and Show   

async function getRepository(profile){
    const res= await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=10`);
    const repo = await res.json();
    return repo;
}
//Repository info show
function showRepository(repos){
    let newHtml='';
    for (const repo of repos) {
        newHtml +=`
        <div class="repo">
        <div class="repo_name">
          <a href="${repo.html_url}">${repo.name}</a>
        </div>
        <p>
          <span class="circle"></span> ${repo.language}
          <ion-icon name="star-outline"></ion-icon>${repo.watchers}
          <ion-icon name="git-branch-outline"></ion-icon>${repo.forks_count}
        </p>
      </div>
        `
    }
    document.querySelector('.repos').innerHTML=newHtml;
}
