export type Locale = 'en' | 'ko';

export const LOCALE_KEY = 'chacha_locale';

const en = {
  // App
  'app.name': 'ChaCha',
  'app.tagline': 'Slowly savor tea, gradually get better',

  // Common
  'common.save': 'Save',
  'common.delete': 'Delete',
  'common.cancel': 'Cancel',
  'common.saving': 'Saving...',
  'common.pleaseWait': 'Please wait...',
  'common.all': 'All',

  // Nav
  'nav.home': 'Home',
  'nav.teaList': 'Tea List',
  'nav.teaware': 'Teaware',
  'nav.profile': 'Profile',

  // Login
  'login.welcomeBack': 'Welcome Back',
  'login.createAccount': 'Create Account',
  'login.username': 'Username',
  'login.email': 'Email',
  'login.emailOrUsername': 'Email or Username',
  'login.password': 'Password',
  'login.signIn': 'Sign In',
  'login.signUp': 'Sign Up',
  'login.alreadyHaveAccount': 'Already have an account?',
  'login.noAccount': "Don't have an account?",
  'login.authFailed': 'Authentication failed',

  // Home
  'home.goodMorning': 'Good Morning',
  'home.goodAfternoon': 'Good Afternoon',
  'home.goodEvening': 'Good Evening',
  'home.teaTime': 'Tea Time',
  'home.teaLover': 'Tea Lover',
  'home.lastBrewed': 'Last Brewed Tea',
  'home.trySomethingNew': 'Try Something New?',
  'home.exploreDesc': 'Explore and add new teas to your collection.',
  'home.exploreCollection': 'Explore Collection',
  'home.noBrewLogs': 'No brew logs yet. Start your first session!',
  'home.brewNow': 'Brew Now',
  'home.yourTeaJourney': 'Your Tea Journey',
  'home.dayStreak': 'Day Streak',
  'home.teasOwned': 'Teas Owned',
  'home.thisWeek': 'This Week',
  'home.weatherFallback': 'Tea Time',
  'home.dailyQuote': 'A Warm Word for Today',
  'home.brewCta': "Record today's tea moment?",
  'home.startBrew': 'Start Brewing',
  'home.viewAll': 'View All',
  'brewList.title': 'Brew Logs',
  'brewList.empty': 'No brew logs yet.',

  // Tea Collection
  'teaCollection.title': 'My Tea Collection',
  'teaCollection.searchPlaceholder': 'Search by name, type, or origin...',
  'teaCollection.noMatch': 'No teas match your search',
  'teaCollection.empty': 'No teas in your collection yet',
  'teaCollection.addTea': 'Add Tea',

  // Tea Categories
  'category.Green': 'Green',
  'category.White': 'White',
  'category.Oolong': 'Oolong',
  'category.Black': 'Black',
  'category.Sheng_Puerh': 'Sheng Pu-erh',
  'category.Shou_Puerh': 'Shou Pu-erh',
  'category.Herbal': 'Herbal',

  // Teaware List
  'teaware.title': 'My Teaware',
  'teaware.noMatch': 'No teaware matches this filter',
  'teaware.empty': 'No teaware added yet',
  'teaware.addTeaware': 'Add Teaware',

  // Teaware Types
  'teawareType.Gaiwan': 'Gaiwan',
  'teawareType.Yixing_Pot': 'Yixing Pot',
  'teawareType.Glass_Pot': 'Glass Pot',
  'teawareType.Pitcher': 'Pitcher',
  'teawareType.Cup': 'Cup',

  // Teaware Statuses
  'status.Active': 'Active',
  'status.Broken': 'Broken',
  'status.Sold': 'Sold',

  // Brew Log Detail
  'brewDetail.notFound': 'Brew log not found',
  'brewDetail.unnamed': 'Unnamed Brew',
  'brewDetail.temp': 'Temp',
  'brewDetail.steep': 'Steep',
  'brewDetail.leaf': 'Leaf',
  'brewDetail.tastingNotes': 'Tasting Notes',
  'brewDetail.equipment': 'Equipment Used',
  'brewDetail.editLog': 'Edit Log',
  'brewDetail.deleteTitle': 'Delete Brew Log',
  'brewDetail.deleteMessage': 'This action cannot be undone. Are you sure you want to delete this brew log?',

  // Brew Log Form
  'brewForm.new': 'New Brew Log',
  'brewForm.edit': 'Edit Brew Log',
  'brewForm.brewDateTime': 'Brew Date & Time',
  'brewForm.tempC': 'Temp (°C)',
  'brewForm.steep': 'Steep',
  'brewForm.leafG': 'Leaf (g)',
  'brewForm.waterType': 'Water Type',
  'brewForm.waterPlaceholder': 'e.g. Filtered, Spring',
  'brewForm.rating': 'Rating',
  'brewForm.tastingNotesReview': 'Tasting Notes / Review',
  'brewForm.tastingPlaceholder': 'Describe the flavor, aroma, texture...',
  'brewForm.save': 'Save Brew Log',
  'brewForm.update': 'Update Brew Log',

  // Tea Form
  'teaForm.add': 'Add Tea',
  'teaForm.edit': 'Edit Tea',
  'teaForm.name': 'Name',
  'teaForm.category': 'Category',
  'teaForm.selectCategory': 'Select category...',
  'teaForm.origin': 'Origin / Brand',
  'teaForm.year': 'Year',
  'teaForm.tastingNotes': 'Tasting Notes',
  'teaForm.tastingPlaceholder': 'Describe the flavor, aroma...',
  'teaForm.inStock': 'In Stock',
  'teaForm.addTea': 'Add Tea',
  'teaForm.updateTea': 'Update Tea',
  'teaForm.deleteTea': 'Delete Tea',
  'teaForm.deleteTitle': 'Delete Tea',
  'teaForm.deleteMessage': 'This will permanently remove this tea from your collection.',

  // Teaware Form
  'teawareForm.add': 'Add Teaware',
  'teawareForm.edit': 'Edit Teaware',
  'teawareForm.name': 'Name',
  'teawareForm.type': 'Type',
  'teawareForm.selectType': 'Select type...',
  'teawareForm.status': 'Status',
  'teawareForm.material': 'Material',
  'teawareForm.volumeMl': 'Volume (ml)',
  'teawareForm.favorite': 'Favorite',
  'teawareForm.addTeaware': 'Add Teaware',
  'teawareForm.updateTeaware': 'Update Teaware',
  'teawareForm.deleteTeaware': 'Delete Teaware',
  'teawareForm.deleteTitle': 'Delete Teaware',
  'teawareForm.deleteMessage': 'This will permanently remove this teaware from your collection.',

  // Profile
  'profile.darkMode': 'Dark Mode',
  'profile.language': 'Language',
  'profile.signOut': 'Sign Out',
  'profile.brews': 'Brews',
  'profile.teas': 'Teas',
  'profile.teaware': 'Teaware',
  'profile.languageLabel': 'English',

  // Components
  'component.teaLeaf': 'Tea Leaf',
  'component.selectTea': 'Select a tea...',
  'component.teawareUsed': 'Teaware Used',
  'component.noTeaware': 'No teaware added yet',
  'component.loadingTeaware': 'Loading teaware...',
  'component.addPhoto': 'Add Photo',
  'component.uploading': 'Uploading...',
  'component.out': 'Out',

  // Toast
  'toast.brewLogDeleted': 'Brew log deleted',
  'toast.brewLogUpdated': 'Brew log updated',
  'toast.brewLogCreated': 'Brew log created',
  'toast.teaUpdated': 'Tea updated',
  'toast.teaAdded': 'Tea added',
  'toast.teaDeleted': 'Tea deleted',
  'toast.teawareUpdated': 'Teaware updated',
  'toast.teawareAdded': 'Teaware added',
  'toast.teawareDeleted': 'Teaware deleted',
  'toast.deleteFailed': 'Failed to delete',
  'toast.saveFailed': 'Failed to save',
  'toast.uploadFailed': 'Image upload failed',

  // Category Manager
  'categoryManager.title': 'Manage Categories',
  'categoryManager.teawareTitle': 'Manage Teaware Types',
  'categoryManager.add': 'Add',
  'categoryManager.placeholder': 'New category name...',
  'categoryManager.default': 'Default',
} as const;

const ko: Record<keyof typeof en, string> = {
  // App
  'app.name': 'ChaCha',
  'app.tagline': '천천히 차를 음미하며 차차 나아지다',

  // Common
  'common.save': '저장',
  'common.delete': '삭제',
  'common.cancel': '취소',
  'common.saving': '저장 중...',
  'common.pleaseWait': '잠시만요...',
  'common.all': '전체',

  // Nav
  'nav.home': '홈',
  'nav.teaList': '차 목록',
  'nav.teaware': '다구',
  'nav.profile': '프로필',

  // Login
  'login.welcomeBack': '다시 오셨군요',
  'login.createAccount': '계정 만들기',
  'login.username': '사용자 이름',
  'login.email': '이메일',
  'login.emailOrUsername': '이메일 또는 사용자 이름',
  'login.password': '비밀번호',
  'login.signIn': '로그인',
  'login.signUp': '회원가입',
  'login.alreadyHaveAccount': '이미 계정이 있으신가요?',
  'login.noAccount': '계정이 없으신가요?',
  'login.authFailed': '인증에 실패했습니다',

  // Home
  'home.goodMorning': '좋은 아침이에요',
  'home.goodAfternoon': '좋은 오후예요',
  'home.goodEvening': '좋은 저녁이에요',
  'home.teaTime': '티 타임',
  'home.teaLover': '티 러버',
  'home.lastBrewed': '최근 우린 차',
  'home.trySomethingNew': '새로운 차를 시도해볼까요?',
  'home.exploreDesc': '새로운 차를 발견하고 컬렉션에 추가해보세요.',
  'home.exploreCollection': '컬렉션 둘러보기',
  'home.noBrewLogs': '아직 기록이 없어요. 첫 브루를 시작해보세요!',
  'home.brewNow': '지금 우리기',
  'home.yourTeaJourney': '나의 차 여행',
  'home.dayStreak': '연속 일수',
  'home.teasOwned': '보유한 차',
  'home.thisWeek': '이번 주',
  'home.weatherFallback': '티 타임',
  'home.dailyQuote': '오늘의 따뜻한 한 마디',
  'home.brewCta': '오늘의 차 한 잔, 기록해볼까요?',
  'home.startBrew': '기록하기',
  'home.viewAll': '전체 보기',
  'brewList.title': '브루 기록',
  'brewList.empty': '아직 기록이 없어요.',

  // Tea Collection
  'teaCollection.title': '내 차 컬렉션',
  'teaCollection.searchPlaceholder': '이름, 종류, 산지로 검색...',
  'teaCollection.noMatch': '검색 결과가 없어요',
  'teaCollection.empty': '아직 컬렉션에 차가 없어요',
  'teaCollection.addTea': '차 추가',

  // Tea Categories
  'category.Green': '녹차',
  'category.White': '백차',
  'category.Oolong': '우롱차',
  'category.Black': '홍차',
  'category.Sheng_Puerh': '생보이차',
  'category.Shou_Puerh': '숙보이차',
  'category.Herbal': '허브차',

  // Teaware List
  'teaware.title': '내 다구',
  'teaware.noMatch': '필터에 맞는 다구가 없어요',
  'teaware.empty': '아직 등록된 다구가 없어요',
  'teaware.addTeaware': '다구 추가',

  // Teaware Types
  'teawareType.Gaiwan': '개완',
  'teawareType.Yixing_Pot': '이싱 주전자',
  'teawareType.Glass_Pot': '유리 주전자',
  'teawareType.Pitcher': '피처',
  'teawareType.Cup': '잔',

  // Teaware Statuses
  'status.Active': '사용 중',
  'status.Broken': '파손',
  'status.Sold': '판매',

  // Brew Log Detail
  'brewDetail.notFound': '기록을 찾을 수 없어요',
  'brewDetail.unnamed': '이름 없는 브루',
  'brewDetail.temp': '온도',
  'brewDetail.steep': '우리기',
  'brewDetail.leaf': '찻잎',
  'brewDetail.tastingNotes': '테이스팅 노트',
  'brewDetail.equipment': '사용한 다구',
  'brewDetail.editLog': '수정',
  'brewDetail.deleteTitle': '기록 삭제',
  'brewDetail.deleteMessage': '이 작업은 되돌릴 수 없어요. 정말 이 기록을 삭제하시겠어요?',

  // Brew Log Form
  'brewForm.new': '새 브루 기록',
  'brewForm.edit': '브루 기록 수정',
  'brewForm.brewDateTime': '브루 날짜와 시간',
  'brewForm.tempC': '온도 (°C)',
  'brewForm.steep': '우리기',
  'brewForm.leafG': '찻잎 (g)',
  'brewForm.waterType': '수질',
  'brewForm.waterPlaceholder': '예: 정수, 약수',
  'brewForm.rating': '평점',
  'brewForm.tastingNotesReview': '테이스팅 노트 / 리뷰',
  'brewForm.tastingPlaceholder': '맛, 향, 질감을 묘사해주세요...',
  'brewForm.save': '기록 저장',
  'brewForm.update': '기록 수정',

  // Tea Form
  'teaForm.add': '차 추가',
  'teaForm.edit': '차 수정',
  'teaForm.name': '이름',
  'teaForm.category': '카테고리',
  'teaForm.selectCategory': '카테고리 선택...',
  'teaForm.origin': '산지 / 브랜드',
  'teaForm.year': '연도',
  'teaForm.tastingNotes': '테이스팅 노트',
  'teaForm.tastingPlaceholder': '맛과 향을 묘사해주세요...',
  'teaForm.inStock': '재고 있음',
  'teaForm.addTea': '차 추가',
  'teaForm.updateTea': '차 수정',
  'teaForm.deleteTea': '차 삭제',
  'teaForm.deleteTitle': '차 삭제',
  'teaForm.deleteMessage': '이 차가 컬렉션에서 영구적으로 삭제됩니다.',

  // Teaware Form
  'teawareForm.add': '다구 추가',
  'teawareForm.edit': '다구 수정',
  'teawareForm.name': '이름',
  'teawareForm.type': '유형',
  'teawareForm.selectType': '유형 선택...',
  'teawareForm.status': '상태',
  'teawareForm.material': '재질',
  'teawareForm.volumeMl': '용량 (ml)',
  'teawareForm.favorite': '즐겨찾기',
  'teawareForm.addTeaware': '다구 추가',
  'teawareForm.updateTeaware': '다구 수정',
  'teawareForm.deleteTeaware': '다구 삭제',
  'teawareForm.deleteTitle': '다구 삭제',
  'teawareForm.deleteMessage': '이 다구가 컬렉션에서 영구적으로 삭제됩니다.',

  // Profile
  'profile.darkMode': '다크 모드',
  'profile.language': '언어',
  'profile.signOut': '로그아웃',
  'profile.brews': '브루',
  'profile.teas': '차',
  'profile.teaware': '다구',
  'profile.languageLabel': '한국어',

  // Components
  'component.teaLeaf': '찻잎',
  'component.selectTea': '차를 선택하세요...',
  'component.teawareUsed': '사용한 다구',
  'component.noTeaware': '아직 등록된 다구가 없어요',
  'component.loadingTeaware': '다구 불러오는 중...',
  'component.addPhoto': '사진 추가',
  'component.uploading': '업로드 중...',
  'component.out': '품절',

  // Toast
  'toast.brewLogDeleted': '기록이 삭제되었습니다',
  'toast.brewLogUpdated': '기록이 수정되었습니다',
  'toast.brewLogCreated': '기록이 생성되었습니다',
  'toast.teaUpdated': '차가 수정되었습니다',
  'toast.teaAdded': '차가 추가되었습니다',
  'toast.teaDeleted': '차가 삭제되었습니다',
  'toast.teawareUpdated': '다구가 수정되었습니다',
  'toast.teawareAdded': '다구가 추가되었습니다',
  'toast.teawareDeleted': '다구가 삭제되었습니다',
  'toast.deleteFailed': '삭제에 실패했습니다',
  'toast.saveFailed': '저장에 실패했습니다',
  'toast.uploadFailed': '이미지 업로드에 실패했습니다',

  // Category Manager
  'categoryManager.title': '카테고리 관리',
  'categoryManager.teawareTitle': '다구 유형 관리',
  'categoryManager.add': '추가',
  'categoryManager.placeholder': '새 카테고리 이름...',
  'categoryManager.default': '기본',
};

export type TranslationKey = keyof typeof en;

export const translations: Record<Locale, Record<TranslationKey, string>> = { en, ko };
