// TODO:
// renforcer la regex psn
// add rechercher en keyword

const getStats = async (pseudo, platform, region) => {
  const res = await fetch(`https://ow-api.herokuapp.com/profile/${platform}/${region}/${pseudo}`);
  const data = await res.json();
  return data;
}

// model: keywords pc|xbl|psn
const instruction = /^(\s*)(chercher|search|find)(\s*)((.{3,12})#\d{4}(\s*)|[a-zA-Z0-9 ]{1,15}|[a-zA-Z0-9_-]{3,16})(\s*)$/;

module.exports = bot => {
  bot.hear(instruction, (payload, chat) => {

  });
};



// getStats('JonGiamp')
  // .then( data => console.log(data))
