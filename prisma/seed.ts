import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const publishedPool = [true, false]

function createNUsers(n:number):Prisma.UserCreateInput[]{
  const myUsers: Prisma.UserCreateInput[] = [];
  for(let i=0;i<n;i++){
    myUsers.push({
      name: `user number ${i+1}`,
      username :`iamuser${i+1}`,
      hashedPassword:`MyPass${i+1}` ,
      email: `userEmail${i+1}@app.com`,
      // password : `user${i}pass`,


      posts: {create: Array.from({ length: 1 }, (_, ) => ({
        title: `post number ${i+1}`,
        content: `Content of post ${i+1}`,
        published:true //publishedPool[Math.round(Math.random())]
      })),
    },
    });
  }
  return myUsers;
}
const newUsers:Prisma.UserCreateInput[] =  createNUsers(20);



async function main() {
  console.log(`Start seeding ...`)
  for (const u of newUsers) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
