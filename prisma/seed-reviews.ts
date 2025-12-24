import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing reviews
  await prisma.review.deleteMany({})
  console.log('✅ Existing reviews deleted')

  // Generate 50 realistic reviews in multiple languages (non-formal)
  const reviews = [
    // Indonesian Reviews (15)
    { userName: "Budi Santoso", comment: "Mantap banget driver nya, ramah dan tau tempat2 hidden gem di Bali!", rating: 5, lang: "id" },
    { userName: "Siti Nurhaliza", comment: "Hiace nya bersih banget, AC dingin, perjalanan jadi nyaman. Recommended!", rating: 5, lang: "id" },
    { userName: "Andi Pratama", comment: "Harga terjangkau tapi pelayanan premium. Driver on time, ga neko-neko.", rating: 4, lang: "id" },
    { userName: "Dewi Lestari", comment: "Family trip jadi seru banget sama Alphard nya. Kids happy, parents happy!", rating: 5, lang: "id" },
    { userName: "Rizky Ahmad", comment: "Driver nya enak diajak ngobrol, tau banget sejarah Bali. Jadi tour guide juga.", rating: 5, lang: "id" },
    { userName: "Maya Putri", comment: "Avanza nya masih baru, bersih, wangi. Ga nyesel deh sewa di sini.", rating: 4, lang: "id" },
    { userName: "Fajar Nugroho", comment: "Dari airport langsung dijemput, driver nya sabar banget nunggu karena delay pesawat.", rating: 5, lang: "id" },
    { userName: "Sarah Wijaya", comment: "Group gaul kita 12 orang muat semua di Hiace. Musikannya ok, driver asyik!", rating: 5, lang: "id" },
    { userName: "Reza Pahlawan", comment: "Sewa 3 hari untuk keliling Bali, driver nya flexible banget, mau kemana aja ikut.", rating: 5, lang: "id" },
    { userName: "Linda Permata", comment: "Innova reborn nya nyaman banget buat jarak jauh. Ga bosen di dalem.", rating: 4, lang: "id" },
    { userName: "Dony Kusumo", comment: "Driver nya tau banget jam sibuk, jadi selalu lewat jalur alternatif. Cepat!", rating: 5, lang: "id" },
    { userName: "Nina Amelia", comment: "Xpander nya keren, fitur lengkap, harga masih masuk akal. Worth it!", rating: 4, lang: "id" },
    { userName: "Hendra Wijaya", comment: "Service nya top banget, dari booking sampai selesai smooth semua.", rating: 5, lang: "id" },
    { userName: "Rina Susanti", comment: "Driver nya halus bawa mobil, ga nabrak-nabrak, aman buat bawa anak-anak.", rating: 5, lang: "id" },
    { userName: "Toni Prasetyo", comment: "Vellfire nya mewah banget, pas banget buat moment spesial anniversary.", rating: 5, lang: "id" },

    // English Reviews (10)
    { userName: "John Smith", comment: "Awesome driver! Knows all the best spots for Instagram pics in Bali.", rating: 5, lang: "en" },
    { userName: "Emma Johnson", comment: "Super clean van, great AC, and the driver is always on time. What more could you ask?", rating: 5, lang: "en" },
    { userName: "Mike Wilson", comment: "Best price in Bali for this quality of service. Driver speaks good English too!", rating: 4, lang: "en" },
    { userName: "Sarah Brown", comment: "Our family trip was perfect thanks to the comfy Alphard. Kids loved it!", rating: 5, lang: "en" },
    { userName: "David Lee", comment: "Driver's like a local guide! Took us to amazing places we'd never find alone.", rating: 5, lang: "en" },
    { userName: "Lisa Chen", comment: "Booked last minute and they still managed to arrange everything. Great service!", rating: 5, lang: "en" },
    { userName: "Tom Harris", comment: "Hiace was perfect for our group of 12. Everyone had space and enjoyed the ride.", rating: 4, lang: "en" },
    { userName: "Amy Taylor", comment: "Driver's super patient with our shopping stops. Never complained once!", rating: 5, lang: "en" },
    { userName: "Chris Martin", comment: "Been to Bali 5 times, this is by far the best car rental service I've used.", rating: 5, lang: "en" },
    { userName: "Jessica White", comment: "Innova's perfect for long trips around Bali. Comfy seats and smooth ride.", rating: 4, lang: "en" },

    // Chinese Reviews (5)
    { userName: "王小明", comment: "司机人超好，知道很多本地人才知道的好地方！推荐！", rating: 5, lang: "zh" },
    { userName: "李美玲", comment: "车子很干净，空调很足，司机很准时。服务一流！", rating: 5, lang: "zh" },
    { userName: "张伟", comment: "价格实惠，服务好，司机还会说中文，沟通很方便。", rating: 4, lang: "zh" },
    { userName: "陈小红", comment: "阿尔法很舒服，我们一家人都很满意。下次还来！", rating: 5, lang: "zh" },
    { userName: "刘强", comment: "司机熟悉路况，避开堵车，节省了很多时间。赞！", rating: 5, lang: "zh" },

    // Korean Reviews (5)
    { userName: "김민준", comment: "기사님이 정말 친절해요! 발리 숨은 명소 다 알려주시네요.", rating: 5, lang: "ko" },
    { userName: "이서연", comment: "차량 깨끗하고 에어컨 잘되요. 가격도 착하고요.", rating: 5, lang: "ko" },
    { userName: "박지성", comment: "가족 여행하기 딱 좋아요. 아이들이 너무 좋아해요.", rating: 5, lang: "ko" },
    { userName: "최수빈", comment: "기사님이 영어도 잘하고 발리 역사도 잘 알려주셔요.", rating: 4, lang: "ko" },
    { userName: "정현우", comment: "예약부터 끝까지 서비스 완벽했어요. 다음에 또 이용할게요!", rating: 5, lang: "ko" },

    // Japanese Reviews (5)
    { userName: "田中太郎", comment: "ドライバーさんがとても親切で、バリの隠れた名所をたくさん教えてくれました！", rating: 5, lang: "ja" },
    { userName: "佐藤花子", comment: "車がとても綺麗で、エアコンも効いています。価格も手頃です。", rating: 5, lang: "ja" },
    { userName: "鈴木一郎", comment: "ファミリーでの旅行に最適でした。子供たちもとても楽しんでいました。", rating: 5, lang: "ja" },
    { userName: "高橋美咲", comment: "ドライバーさんが英語も話せて、バリの歴史にも詳しいです。", rating: 4, lang: "ja" },
    { userName: "伊藤健太", comment: "予約から完了までサービスが完璧でした。また利用したいです！", rating: 5, lang: "ja" },

    // Arabic Reviews (5)
    { userName: "أحمد محمد", comment: "السائق ممتاز جداً! يعرف أفضل الأماكن في بالي.", rating: 5, lang: "ar" },
    { userName: "فاطمة الزهراء", comment: "السيارة نظيفة جداً والتكييف يعمل بشكل ممتاز. أنصح بالتعامل.", rating: 5, lang: "ar" },
    { userName: "علي حسن", comment: "خدمة رائعة والسائق متعاون جداً. التجربة كانت ممتازة.", rating: 4, lang: "ar" },
    { userName: "مريم أحمد", comment: "السيارة الفاخرة كانت مثالية لعائلتنا. الأطفال استمتعوا كثيراً.", rating: 5, lang: "ar" },
    { userName: "يوسف علي", comment: "السائق يعرف الطرق جيداً ويجنبنا الازدحام. ممتاز!", rating: 5, lang: "ar" },

    // Russian Reviews (5)
    { userName: "Иван Петров", comment: "Водитель отличный! Знает все лучшие места в Бали.", rating: 5, lang: "ru" },
    { userName: "Анна Смирнова", comment: "Машина чистая, кондиционер работает хорошо. Рекомендую!", rating: 5, lang: "ru" },
    { userName: "Дмитрий Иванов", comment: "Отличное обслуживание и водитель очень вежливый. Было здорово!", rating: 4, lang: "ru" },
    { userName: "Елена Кузнецова", comment: "Альфард идеален для нашей семьи. Дети были в восторге!", rating: 5, lang: "ru" },
    { userName: "Михаил Соколов", comment: "Водитель знает дороги и избегает пробок. Отличная работа!", rating: 5, lang: "ru" }
  ]

  // Shuffle reviews to randomize the order
  const shuffledReviews = reviews.sort(() => Math.random() - 0.5)

  // Insert reviews into database with random timestamps
  const reviewsWithTimestamps = shuffledReviews.map((review, index) => ({
    userName: review.userName,
    comment: review.comment,
    rating: review.rating,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random within last 30 days
  }))

  await prisma.review.createMany({ 
    data: reviewsWithTimestamps 
  })

  console.log(`✅ Successfully created ${reviews.length} realistic reviews in multiple languages!`)
  console.log(`📊 Language distribution:`)
  console.log(`   🇮🇩 Indonesian: ${reviews.filter(r => r.lang === 'id').length} reviews`)
  console.log(`   🇺🇸 English: ${reviews.filter(r => r.lang === 'en').length} reviews`)
  console.log(`   🇨🇳 Chinese: ${reviews.filter(r => r.lang === 'zh').length} reviews`)
  console.log(`   🇰🇷 Korean: ${reviews.filter(r => r.lang === 'ko').length} reviews`)
  console.log(`   🇯🇵 Japanese: ${reviews.filter(r => r.lang === 'ja').length} reviews`)
  console.log(`   🇸🇦 Arabic: ${reviews.filter(r => r.lang === 'ar').length} reviews`)
  console.log(`   🇷🇺 Russian: ${reviews.filter(r => r.lang === 'ru').length} reviews`)
}

main()
  .catch(e => {
    console.error('❌ Error creating reviews:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })