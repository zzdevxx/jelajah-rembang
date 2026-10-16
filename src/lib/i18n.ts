export const LANGS = ['id', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'id';

export const LANG_LABEL: Record<Lang, string> = { id: 'Indonesia', en: 'English' };
export const LANG_SHORT: Record<Lang, string> = { id: 'ID', en: 'EN' };
export const HTML_LANG: Record<Lang, string> = { id: 'id-ID', en: 'en-US' };

/** Deteksi bahasa dari URL: `/en/...` → 'en', selain itu 'id'. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : 'id';
}

/** Bahasa pasangan. */
export function otherLang(lang: Lang): Lang {
  return lang === 'id' ? 'en' : 'id';
}

/**
 * Bangun path untuk sebuah bahasa.
 * localizePath('/sejarah', 'en') → '/en/sejarah/'
 * localizePath('/sejarah', 'id') → '/sejarah/'
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
  const base = clean === '/' ? '' : clean;
  if (lang === DEFAULT_LANG) return `${base}/` || '/';
  return `/en${base}/`;
}

/** Ubah path ber-prefix bahasa apa pun menjadi path netral (tanpa locale). */
export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

/* ==========================================================================
   Kamus UI
   ========================================================================== */

const dict = {
  id: {
    'site.name': 'Jelajah Rembang',
    'site.tagline': 'Sejarah, budaya, dan kuliner pesisir utara Jawa Tengah',
    'site.description':
      'Profil digital Kabupaten Rembang: sejarah Lasem, batik tulis, kuliner khas, dan destinasi wisata di gerbang timur Jawa Tengah.',

    'nav.home': 'Beranda',
    'nav.sejarah': 'Sejarah',
    'nav.budaya': 'Budaya',
    'nav.kuliner': 'Kuliner',
    'nav.destinasi': 'Destinasi',
    'nav.profil': 'Profil',
    'nav.galeri': 'Galeri',
    'nav.peta': 'Peta',

    'nav.menu': 'Menu',
    'nav.open': 'Buka menu',
    'nav.close': 'Tutup menu',
    'nav.skip': 'Lompat ke konten',

    'lang.switch': 'Ganti bahasa',
    'lang.readIn': 'Baca dalam bahasa Inggris',

    'theme.toggle': 'Ubah tema',
    'theme.light': 'Terang',
    'theme.dark': 'Gelap',

    'common.readMore': 'Baca selengkapnya',
    'common.viewAll': 'Lihat semua',
    'common.backTo': 'Kembali ke',
    'common.updated': 'Diperbarui',
    'common.source': 'Sumber',
    'common.year': 'Tahun data',
    'common.origin': 'Asal',
    'common.ingredients': 'Bahan utama',
    'common.kecamatan': 'Kecamatan',
    'common.category': 'Kategori',
    'common.access': 'Akses',
    'common.hours': 'Jam buka',
    'common.ticket': 'Tiket',
    'common.coords': 'Koordinat',
    'common.photoCount': 'foto',
    'common.notFound': 'Halaman tidak ditemukan',
    'common.notFoundBody':
      'Halaman yang Anda cari tidak ada atau sudah dipindahkan. Coba mulai dari beranda.',
    'common.backHome': 'Kembali ke beranda',

    'home.heroTitle': 'Rembang',
    'home.heroLead':
      'Di gerbang timur Jawa Tengah, tempat tiga negeri bertemu dalam sehelai kain: merah Lasem, biru pesisir, dan soga tanah.',
    'home.exploreSejarah': 'Jelajahi sejarah',
    'home.exploreKuliner': 'Cicipi kulinernya',
    'home.sectionsTitle': 'Jelajahi Rembang',
    'home.featuredKuliner': 'Kuliner khas',
    'home.featuredDestinasi': 'Destinasi pilihan',
    'home.factsTitle': 'Rembang sekilas',
    'home.mapTitle': 'Peta destinasi',
    'home.mapLead': 'Lihat sebaran destinasi di seluruh 14 kecamatan.',

    'sejarah.title': 'Sejarah',
    'sejarah.lead':
      'Dari jalur dagang pesisir masa Majapahit hingga tanah kelahiran R.A. Kartini — rekam jejak sebuah kota pelabuhan.',
    'sejarah.timeline': 'Garis waktu',

    'budaya.title': 'Budaya',
    'budaya.lead':
      'Batik tiga negeri, klenteng tua, wayang potehi, dan tradisi laut — warisan akulturasi yang masih hidup.',

    'kuliner.title': 'Kuliner',
    'kuliner.lead':
      'Hidangan pesisir yang lahir dari laut, tambak garam, dan dapur rumah: dari sate srepeh hingga urap latoh.',

    'destinasi.title': 'Destinasi',
    'destinasi.lead': 'Pantai, situs sejarah, tempat ibadah tua, dan alam perbukitan di Rembang.',
    'destinasi.onMap': 'Lihat di peta',

    'profil.title': 'Profil & Geografi',
    'profil.lead': 'Wilayah, kependudukan, iklim, dan potensi daerah Kabupaten Rembang.',
    'profil.geography': 'Geografi',
    'profil.demography': 'Kependudukan',
    'profil.kecamatanTitle': '14 Kecamatan',
    'profil.economy': 'Potensi daerah',
    'profil.climate': 'Iklim',

    'galeri.title': 'Galeri',
    'galeri.lead': 'Rembang dalam gambar — warisan, lanskap, dan kehidupan sehari-hari.',
    'galeri.openImage': 'Perbesar gambar',
    'galeri.close': 'Tutup',
    'galeri.prev': 'Sebelumnya',
    'galeri.next': 'Berikutnya',

    'peta.title': 'Peta Interaktif',
    'peta.lead': 'Jelajahi destinasi Rembang pada peta.',
    'peta.list': 'Daftar destinasi',
    'peta.loading': 'Memuat peta…',
    'peta.legend': 'Keterangan',

    'search.open': 'Cari',
    'search.title': 'Cari di Jelajah Rembang',
    'search.placeholder': 'Ketik kata kunci, misalnya batik atau Kartini',
    'search.hint': 'Pencarian menelusuri judul dan isi artikel dalam bahasa Indonesia.',
    'search.initial': 'Mulai mengetik untuk mencari di seluruh artikel.',
    'search.noResults': 'Tidak ada hasil yang cocok. Coba kata kunci lain.',

    'footer.sections': 'Jelajahi',
    'footer.about': 'Tentang',
    'footer.aboutText':
      'Situs profil daerah Kabupaten Rembang. Disusun dari sumber Pemerintah Kabupaten Rembang, BPS, dan riset warisan budaya.',
    'footer.credits': 'Kredit & lisensi',
    'footer.creditsNote':
      'Sebagian foto berasal dari Wikimedia Commons dengan lisensi bebas dan atribusi tercantum.',
    'footer.rights': 'Situs tidak resmi. Dibuat untuk tujuan edukasi dan pelestarian budaya.',
  },
  en: {
    'site.name': 'Jelajah Rembang',
    'site.tagline': 'History, culture, and cuisine of Java’s north coast',
    'site.description':
      'A digital profile of Rembang Regency: the history of Lasem, hand-drawn batik, signature cuisine, and destinations at the eastern gate of Central Java.',

    'nav.home': 'Home',
    'nav.sejarah': 'History',
    'nav.budaya': 'Culture',
    'nav.kuliner': 'Cuisine',
    'nav.destinasi': 'Destinations',
    'nav.profil': 'Profile',
    'nav.galeri': 'Gallery',
    'nav.peta': 'Map',

    'nav.menu': 'Menu',
    'nav.open': 'Open menu',
    'nav.close': 'Close menu',
    'nav.skip': 'Skip to content',

    'lang.switch': 'Change language',
    'lang.readIn': 'Read in Indonesian',

    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',

    'common.readMore': 'Read more',
    'common.viewAll': 'View all',
    'common.backTo': 'Back to',
    'common.updated': 'Updated',
    'common.source': 'Source',
    'common.year': 'Data year',
    'common.origin': 'Origin',
    'common.ingredients': 'Key ingredients',
    'common.kecamatan': 'District',
    'common.category': 'Category',
    'common.access': 'Access',
    'common.hours': 'Hours',
    'common.ticket': 'Ticket',
    'common.coords': 'Coordinates',
    'common.photoCount': 'photos',
    'common.notFound': 'Page not found',
    'common.notFoundBody':
      'The page you are looking for does not exist or has been moved. Try starting from the home page.',
    'common.backHome': 'Back to home',

    'home.heroTitle': 'Rembang',
    'home.heroLead':
      'At the eastern gate of Central Java, where three lands meet in a single cloth: Lasem red, coastal blue, and the soga of the earth.',
    'home.exploreSejarah': 'Explore the history',
    'home.exploreKuliner': 'Taste the cuisine',
    'home.sectionsTitle': 'Explore Rembang',
    'home.featuredKuliner': 'Signature dishes',
    'home.featuredDestinasi': 'Selected destinations',
    'home.factsTitle': 'Rembang at a glance',
    'home.mapTitle': 'Destination map',
    'home.mapLead': 'See destinations across all 14 districts.',

    'sejarah.title': 'History',
    'sejarah.lead':
      'From the coastal trade routes of the Majapahit era to the birthplace of R.A. Kartini — the record of a port town.',
    'sejarah.timeline': 'Timeline',

    'budaya.title': 'Culture',
    'budaya.lead':
      'Batik of three lands, old temples, potehi puppetry, and sea traditions — a living heritage of acculturation.',

    'kuliner.title': 'Cuisine',
    'kuliner.lead':
      'Coastal dishes born of the sea, the salt ponds, and the home kitchen: from sate srepeh to urap latoh.',

    'destinasi.title': 'Destinations',
    'destinasi.lead': 'Beaches, historical sites, old places of worship, and the hills of Rembang.',
    'destinasi.onMap': 'View on map',

    'profil.title': 'Profile & Geography',
    'profil.lead': 'Land, people, climate, and the economic potential of Rembang Regency.',
    'profil.geography': 'Geography',
    'profil.demography': 'Demography',
    'profil.kecamatanTitle': '14 Districts',
    'profil.economy': 'Economic potential',
    'profil.climate': 'Climate',

    'galeri.title': 'Gallery',
    'galeri.lead': 'Rembang in images — heritage, landscape, and daily life.',
    'galeri.openImage': 'Enlarge image',
    'galeri.close': 'Close',
    'galeri.prev': 'Previous',
    'galeri.next': 'Next',

    'peta.title': 'Interactive Map',
    'peta.lead': 'Explore Rembang’s destinations on the map.',
    'peta.list': 'Destination list',
    'peta.loading': 'Loading map…',
    'peta.legend': 'Legend',

    'search.open': 'Search',
    'search.title': 'Search Jelajah Rembang',
    'search.placeholder': 'Type a keyword, such as batik or Kartini',
    'search.hint': 'Search covers article titles and body text in English.',
    'search.initial': 'Start typing to search every article.',
    'search.noResults': 'No matching results. Try another keyword.',

    'footer.sections': 'Explore',
    'footer.about': 'About',
    'footer.aboutText':
      'A regional profile site for Rembang Regency, compiled from the Regency Government, the Central Bureau of Statistics, and cultural-heritage research.',
    'footer.credits': 'Credits & licences',
    'footer.creditsNote':
      'Some photographs come from Wikimedia Commons under free licences, with attribution listed.',
    'footer.rights': 'Unofficial site. Made for education and cultural preservation.',
  },
} as const;

export type UIKey = keyof (typeof dict)['id'];

/** Terjemahkan kunci UI. */
export function t(key: UIKey, lang: Lang): string {
  return dict[lang][key] ?? dict[DEFAULT_LANG][key];
}

/** Kamus lengkap untuk sebuah bahasa (untuk komponen yang butuh banyak kunci). */
export function dictFor(lang: Lang): Record<UIKey, string> {
  return dict[lang] as Record<UIKey, string>;
}
