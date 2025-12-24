const fs = require('fs');
const path = require('path');

const additionalKeysToAdd = {
  en: {
    "EmailNotVerified": "Email not verified. Please verify your email first.",
    "Enter6DigitCode": "Enter 6-digit code sent to your email",
    "BackToHome": "Back to Home",
    "ResendOTP": "Resend OTP",
    "PasswordSuccessfullyChanged": "Password Successfully Changed!",
    "LoggingInAutomatically": "Logging in automatically..."
  },
  id: {
    "EmailNotVerified": "Email belum diverifikasi. Silakan verifikasi email Anda terlebih dahulu.",
    "Enter6DigitCode": "Masukkan kode 6 digit yang dikirim ke email Anda",
    "BackToHome": "Kembali ke Beranda",
    "ResendOTP": "Kirim Ulang OTP",
    "PasswordSuccessfullyChanged": "Kata Sandi Berhasil Diubah!",
    "LoggingInAutomatically": "Masuk secara otomatis..."
  },
  ar: {
    "EmailNotVerified": "البريد الإلكتروني غير مُحقق. يرجى التحقق من بريدك الإلكتروني أولاً.",
    "Enter6DigitCode": "أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني",
    "BackToHome": "العودة إلى الصفحة الرئيسية",
    "ResendOTP": "إعادة إرسال OTP",
    "PasswordSuccessfullyChanged": "تم تغيير كلمة المرور بنجاح!",
    "LoggingInAutomatically": "تسجيل الدخول تلقائياً..."
  },
  zh: {
    "EmailNotVerified": "邮箱未验证。请先验证您的邮箱。",
    "Enter6DigitCode": "输入发送到您邮箱的6位数字代码",
    "BackToHome": "返回首页",
    "ResendOTP": "重新发送OTP",
    "PasswordSuccessfullyChanged": "密码修改成功！",
    "LoggingInAutomatically": "自动登录中..."
  },
  ko: {
    "EmailNotVerified": "이메일이 확인되지 않았습니다. 먼저 이메일을 확인해주세요.",
    "Enter6DigitCode": "이메일로 전송된 6자리 숫자 코드를 입력하세요",
    "BackToHome": "홈으로 돌아가기",
    "ResendOTP": "OTP 재전송",
    "PasswordSuccessfullyChanged": "비밀번호가 성공적으로 변경되었습니다!",
    "LoggingInAutomatically": "자동 로그인 중..."
  },
  pt: {
    "EmailNotVerified": "Email não verificado. Por favor, verifique seu email primeiro.",
    "Enter6DigitCode": "Digite o código de 6 dígitos enviado para seu email",
    "BackToHome": "Voltar ao Início",
    "ResendOTP": "Reenviar OTP",
    "PasswordSuccessfullyChanged": "Senha Alterada com Sucesso!",
    "LoggingInAutomatically": "Fazendo login automaticamente..."
  },
  ru: {
    "EmailNotVerified": "Email не подтвержден. Пожалуйста, подтвердите ваш email сначала.",
    "Enter6DigitCode": "Введите 6-значный код, отправленный на ваш email",
    "BackToHome": "Вернуться на главную",
    "ResendOTP": "Отправить OTP снова",
    "PasswordSuccessfullyChanged": "Пароль успешно изменен!",
    "LoggingInAutomatically": "Вход автоматически..."
  },
  tr: {
    "EmailNotVerified": "E-posta doğrulanmadı. Lütfen önce e-postanızı doğrulayın.",
    "Enter6DigitCode": "E-postanıza gönderilen 6 haneli kodu girin",
    "BackToHome": "Anasayfaya Dön",
    "ResendOTP": "OTP'yi Tekrar Gönder",
    "PasswordSuccessfullyChanged": "Şifre Başarıyla Değiştirildi!",
    "LoggingInAutomatically": "Otomatik giriş yapılıyor..."
  }
};

const languages = ['en', 'id', 'ar', 'zh', 'ko', 'pt', 'ru', 'tr'];

languages.forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    
    // Tambahkan keys baru
    Object.assign(json, additionalKeysToAdd[lang]);
    
    // Sort keys secara alfabetis
    const sortedJson = Object.keys(json).sort().reduce((acc, key) => {
      acc[key] = json[key];
      return acc;
    }, {});
    
    fs.writeFileSync(filePath, JSON.stringify(sortedJson, null, 2), 'utf8');
    console.log(`✅ ${lang}.json updated with additional keys`);
  } catch (err) {
    console.error(`❌ Error updating ${lang}.json:`, err.message);
  }
});

console.log('\n✅ All language files updated with additional keys successfully!');
