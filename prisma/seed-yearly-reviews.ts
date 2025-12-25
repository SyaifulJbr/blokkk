import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function generateReviewsWithRandomTimestamps() {
  try {
    // Clear existing reviews
    await prisma.review.deleteMany({})
    console.log('✅ Existing reviews deleted')

    // Generate 50 realistic reviews with random timestamps over 1 year
    const reviews = [
      // Indonesian Reviews (15) - Non-Formal & Gaul
      { 
        userName: "Budi Santoso", 
        comment: "Driver nya super ramah, tau banget hidden spot di Bali yang gak ada di Google Maps!", 
        rating: 5, 
        lang: "id",
        category: "driver_service"
      },
      { 
        userName: "Siti Nurhaliza", 
        comment: "Hiace nya wangi, AC dingin pol, anak-anak tidur nyenyak di perjalanan.", 
        rating: 5, 
        lang: "id",
        category: "vehicle_quality"
      },
      { 
        userName: "Andi Pratama", 
        comment: "Harga pas di kantong, tapi pelayanan bintang 5. Driver on time, ga telat.", 
        rating: 4, 
        lang: "id",
        category: "price_value"
      },
      { 
        userName: "Dewi Lestari", 
        comment: "Alphard nya mantap buat liburan keluarga. Kids happy, parents happy!", 
        rating: 5, 
        lang: "id",
        category: "family_experience"
      },
      { 
        userName: "Rizky Ahmad", 
        comment: "Driver nya enak diajak ngobrol, tau sejarah Bali. Jadi tour guide gratis!", 
        rating: 5, 
        lang: "id",
        category: "driver_knowledge"
      },
      { 
        userName: "Maya Putri", 
        comment: "Avanza nya masih gress, bersih, wangi. Puas banget deh.", 
        rating: 4, 
        lang: "id",
        category: "vehicle_quality"
      },
      { 
        userName: "Fajar Nugroho", 
        comment: "Delay 3 jam tetapi driver masih sabar nunggu di airport. Top service!", 
        rating: 5, 
        lang: "id",
        category: "customer_service"
      },
      { 
        userName: "Sarah Wijaya", 
        comment: "Geng kita 12 orang muat semua di Hiace. Musiknya OK, driver asyik!", 
        rating: 5, 
        lang: "id",
        category: "group_experience"
      },
      { 
        userName: "Reza Pahlawan", 
        comment: "Sewa 3 hari keliling Bali, driver flexible banget. Mau kemana aja ikut.", 
        rating: 5, 
        lang: "id",
        category: "flexibility"
      },
      { 
        userName: "Linda Permata", 
        comment: "Innova reborn nyaman banget buat jarak jauh. Ga bosen di dalem.", 
        rating: 4, 
        lang: "id",
        category: "comfort"
      },
      { 
        userName: "Dony Kusumo", 
        comment: "Driver tau banget jam sibuk, selalu lewat jalur alternatif. Cepat!", 
        rating: 5, 
        lang: "id",
        category: "local_knowledge"
      },
      { 
        userName: "Nina Amelia", 
        comment: "Xpander nya keren, fitur lengkap, harga worth it!", 
        rating: 4, 
        lang: "id",
        category: "price_value"
      },
      { 
        userName: "Hendra Wijaya", 
        comment: "Service nya top banget, dari booking sampai selesai smooth semua.", 
        rating: 5, 
        lang: "id",
        category: "overall_experience"
      },
      { 
        userName: "Rina Susanti", 
        comment: "Driver halus bawa mobil, aman buat bawa anak-anak.", 
        rating: 5, 
        lang: "id",
        category: "safety"
      },
      { 
        userName: "Toni Prasetyo", 
        comment: "Vellfire nya mewah banget, pas buat anniversary moment.", 
        rating: 5, 
        lang: "id",
        category: "luxury_experience"
      },

      // English Reviews (10) - Casual & Natural
      { 
        userName: "John Smith", 
        comment: "Awesome driver! Knows all the best Instagram spots in Bali.", 
        rating: 5, 
        lang: "en",
        category: "local_knowledge"
      },
      { 
        userName: "Emma Johnson", 
        comment: "Super clean van, great AC, driver always on time. What more could you ask?", 
        rating: 5, 
        lang: "en",
        category: "vehicle_quality"
      },
      { 
        userName: "Mike Wilson", 
        comment: "Best price in Bali for this quality of service. Driver speaks good English too!", 
        rating: 4, 
        lang: "en",
        category: "price_value"
      },
      { 
        userName: "Sarah Brown", 
        comment: "Our family trip was perfect thanks to the comfy Alphard. Kids loved it!", 
        rating: 5, 
        lang: "en",
        category: "family_experience"
      },
      { 
        userName: "David Lee", 
        comment: "Driver's like a local guide! Took us to amazing places we'd never find alone.", 
        rating: 5, 
        lang: "en",
        category: "driver_knowledge"
      },
      { 
        userName: "Lisa Chen", 
        comment: "Booked last minute and they still managed to arrange everything. Great service!", 
        rating: 5, 
        lang: "en",
        category: "customer_service"
      },
      { 
        userName: "Tom Harris", 
        comment: "Hiace was perfect for our group of 12. Everyone had space and enjoyed the ride.", 
        rating: 4, 
        lang: "en",
        category: "group_experience"
      },
      { 
        userName: "Amy Taylor", 
        comment: "Driver was super patient with our shopping stops. Never complained once!", 
        rating: 5, 
        lang: "en",
        category: "patience"
      },
      { 
        userName: "Chris Martin", 
        comment: "Been to Bali 5 times, this is by far the best car rental service I've used.", 
        rating: 5, 
        lang: "en",
        category: "overall_experience"
      },
      { 
        userName: "Jessica White", 
        comment: "Innova's perfect for long trips around Bali. Comfy seats and smooth ride.", 
        rating: 4, 
        lang: "en",
        category: "comfort"
      },

      // Chinese Reviews (5) - Conversational
      { 
        userName: "王小明", 
        comment: "司机人超好，知道很多本地人才知道的好地方！推荐！", 
        rating: 5, 
        lang: "zh",
        category: "local_knowledge"
      },
      { 
        userName: "李美玲", 
        comment: "车子很干净，空调很足，司机很准时。服务一流！", 
        rating: 5, 
        lang: "zh",
        category: "vehicle_quality"
      },
      { 
        userName: "张伟", 
        comment: "价格实惠，服务好，司机还会说中文，沟通很方便。", 
        rating: 4, 
        lang: "zh",
        category: "price_value"
      },
      { 
        userName: "陈小红", 
        comment: "阿尔法很舒服，我们一家人都很满意。下次还来！", 
        rating: 5, 
        lang: "zh",
        category: "family_experience"
      },
      { 
        userName: "刘强", 
        comment: "司机熟悉路况，避开堵车，节省了很多时间。赞！", 
        rating: 5, 
        lang: "zh",
        category: "local_knowledge"
      },

      // Korean Reviews (5) - Friendly
      { 
        userName: "김민준", 
        comment: "기사님이 정말 친절해요! 발리 숨은 명소 다 알려주시네요.", 
        rating: 5, 
        lang: "ko",
        category: "local_knowledge"
      },
      { 
        userName: "이서연", 
        comment: "차량 깨끗하고 에어컨 잘되요. 가격도 착하고요.", 
        rating: 5, 
        lang: "ko",
        category: "vehicle_quality"
      },
      { 
        userName: "박지성", 
        comment: "가족 여행하기 딱 좋아요. 아이들이 너무 좋아해요.", 
        rating: 5, 
        lang: "ko",
        category: "family_experience"
      },
      { 
        userName: "최수빈", 
        comment: "기사님이 영어도 잘하고 발리 역사도 잘 알려주셔요.", 
        rating: 4, 
        lang: "ko",
        category: "driver_knowledge"
      },
      { 
        userName: "정현우", 
        comment: "예약부터 끝까지 서비스 완벽했어요. 다음에 또 이용할게요!", 
        rating: 5, 
        lang: "ko",
        category: "overall_experience"
      },

      // Japanese Reviews (5) - Polite but Casual
      { 
        userName: "田中太郎", 
        comment: "ドライバーさんがとても親切で、バリの隠れた名所をたくさん教えてくれました！", 
        rating: 5, 
        lang: "ja",
        category: "local_knowledge"
      },
      { 
        userName: "佐藤花子", 
        comment: "車がとても綺麗で、エアコンも効いています。価格も手頃です。", 
        rating: 5, 
        lang: "ja",
        category: "vehicle_quality"
      },
      { 
        userName: "鈴木一郎", 
        comment: "ファミリーでの旅行に最適でした。子供たちもとても楽しんでいました。", 
        rating: 5, 
        lang: "ja",
        category: "family_experience"
      },
      { 
        userName: "高橋美咲", 
        comment: "ドライバーさんが英語も話せて、バリの歴史にも詳しいです。", 
        rating: 4, 
        lang: "ja",
        category: "driver_knowledge"
      },
      { 
        userName: "伊藤健太", 
        comment: "予約から完了までサービスが完璧でした。また利用したいです！", 
        rating: 5, 
        lang: "ja",
        category: "overall_experience"
      },

      // Arabic Reviews (5) - Natural
      { 
        userName: "أحمد محمد", 
        comment: "السائق ممتاز جداً! يعرف أفضل الأماكن في بالي.", 
        rating: 5, 
        lang: "ar",
        category: "local_knowledge"
      },
      { 
        userName: "فاطمة الزهراء", 
        comment: "السيارة نظيفة جداً والتكييف يعمل بشكل ممتاز. أنصح بالتعامل.", 
        rating: 5, 
        lang: "ar",
        category: "vehicle_quality"
      },
      { 
        userName: "علي حسن", 
        comment: "خدمة رائعة والسائق متعاون جداً. التجربة كانت ممتازة.", 
        rating: 4, 
        lang: "ar",
        category: "customer_service"
      },
      { 
        userName: "مريم أحمد", 
        comment: "السيارة الفاخرة كانت مثالية لعائلتنا. الأطفال استمتعوا كثيراً.", 
        rating: 5, 
        lang: "ar",
        category: "family_experience"
      },
      { 
        userName: "يوسف علي", 
        comment: "السائق يعرف الطرق جيداً ويجنبنا الازدحام. ممتاز!", 
        rating: 5, 
        lang: "ar",
        category: "local_knowledge"
      },

      // Russian Reviews (5) - Everyday Language
      { 
        userName: "Иван Петров", 
        comment: "Водитель отличный! Знает все лучшие места в Бали.", 
        rating: 5, 
        lang: "ru",
        category: "local_knowledge"
      },
      { 
        userName: "Анна Смирнова", 
        comment: "Машина чистая, кондиционер работает хорошо. Рекомендую!", 
        rating: 5, 
        lang: "ru",
        category: "vehicle_quality"
      },
      { 
        userName: "Дмитрий Иванов", 
        comment: "Отличное обслуживание и водитель очень вежливый. Было здорово!", 
        rating: 4, 
        lang: "ru",
        category: "customer_service"
      },
      { 
        userName: "Елена Кузнецова", 
        comment: "Альфард идеален для нашей семьи. Дети были в восторге!", 
        rating: 5, 
        lang: "ru",
        category: "family_experience"
      },
      { 
        userName: "Михаил Соколов", 
        comment: "Водитель знает дороги и избегает пробок. Отличная работа!", 
        rating: 5, 
        lang: "ru",
        category: "local_knowledge"
      }
    ]

    // Generate random timestamps within the last year
    const now = new Date()
    const oneYearAgo = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000))
    
    // Create reviews with random timestamps
    const reviewsWithTimestamps = reviews.map((review, index) => {
      // Generate random timestamp within the last year
      const randomTime = oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime())
      const createdAt = new Date(randomTime)
      
      // Add some variation - more recent reviews are slightly more common
      const timeWeight = Math.random()
      let adjustedTime = randomTime
      
      if (timeWeight > 0.7) {
        // 30% of reviews are from the last 3 months
        const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000))
        adjustedTime = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
      } else if (timeWeight > 0.4) {
        // 30% are from 3-6 months ago
        const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000))
        adjustedTime = sixMonthsAgo.getTime() + Math.random() * (90 * 24 * 60 * 60 * 1000)
      }
      
      return {
        userName: review.userName,
        comment: review.comment,
        rating: review.rating,
        createdAt: new Date(adjustedTime)
      }
    })

    // Sort by createdAt to simulate natural insertion order
    reviewsWithTimestamps.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    // Insert into database
    await prisma.review.createMany({ 
      data: reviewsWithTimestamps 
    })

    console.log(`✅ Successfully created ${reviewsWithTimestamps.length} reviews with random timestamps!`)
    console.log(`📅 Date range: ${reviewsWithTimestamps[0]?.createdAt.toLocaleDateString()} to ${reviewsWithTimestamps[reviewsWithTimestamps.length - 1]?.createdAt.toLocaleDateString()}`)
    
    // Show distribution by month
    const monthDistribution: { [key: string]: number } = {}
    reviewsWithTimestamps.forEach(review => {
      const month = review.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      monthDistribution[month] = (monthDistribution[month] || 0) + 1
    })
    
    console.log(`📊 Monthly distribution:`)
    Object.entries(monthDistribution).forEach(([month, count]) => {
      console.log(`   ${month}: ${count} reviews`)
    })

    console.log(`🌍 Language distribution:`)
    console.log(`   🇮🇩 Indonesian: ${reviews.filter(r => r.lang === 'id').length} reviews`)
    console.log(`   🇺🇸 English: ${reviews.filter(r => r.lang === 'en').length} reviews`)
    console.log(`   🇨🇳 Chinese: ${reviews.filter(r => r.lang === 'zh').length} reviews`)
    console.log(`   🇰🇷 Korean: ${reviews.filter(r => r.lang === 'ko').length} reviews`)
    console.log(`   🇯🇵 Japanese: ${reviews.filter(r => r.lang === 'ja').length} reviews`)
    console.log(`   🇸🇦 Arabic: ${reviews.filter(r => r.lang === 'ar').length} reviews`)
    console.log(`   🇷🇺 Russian: ${reviews.filter(r => r.lang === 'ru').length} reviews`)

  } catch (error) {
    console.error('❌ Error creating reviews:', error)
  } finally {
    await prisma.$disconnect()
  }
}

generateReviewsWithRandomTimestamps()