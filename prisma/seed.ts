import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const publishedPool = [true, false]

function createNUsers(n:number):Prisma.UserCreateInput[]{
  const myUsers: Prisma.UserCreateInput[] = [];
  for(let i=0;i<n;i++){
    myUsers.push({
      name: `user number ${i+1}`,
      email: `userEmail${i+1}@app.com`,
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

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
]

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
