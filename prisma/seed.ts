import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  console.log('Iniciando seed...')

  // Limpar dados existentes
  await prisma.cliqueContato.deleteMany()
  await prisma.avaliacao.deleteMany()
  await prisma.empresa.deleteMany()
  await prisma.prestador.deleteMany()

  // ==================== EMPRESAS ====================

  const empresas = [
    // Três Lagoas-MS - Hospitais/Clínicas Veterinárias
    {
      nome: 'CRC Vet - Hospital Veterinário 24h',
      tipo: 'HOSPITAL_VETERINARIO',
      descricao: 'Hospital veterinário com atendimento 24 horas, todos os dias. Oferece emergência, atendimento clínico, exames de imagem, cirurgias ortopédicas e muito mais. Fundado em 2017.',
      logo: '/images/logo.png',
      telefone: '(67) 3522-4367',
      whatsapp: '(67) 99715-3390',
      email: 'crcveterinario@gmail.com',
      instagram: '@hospital.crc.vet',
      cidade: 'Três Lagoas-MS',
      bairro: 'Centro',
      endereco: 'Rua Paranaíba, 57 - Centro',
      destaque: true,
    },
    {
      nome: 'Diego Mazetti Clínica Veterinária',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica veterinária completa com consultas, vacinações, vermifugações, castração, cirurgias, exames e internações para cães e gatos.',
      logo: '/images/logo.png',
      telefone: '(67) 3521-8700',
      whatsapp: '(67) 99250-9074',
      email: 'diego_mazetti@yahoo.com.br',
      cidade: 'Três Lagoas-MS',
      bairro: 'Vila Nova',
      endereco: 'Rua Elmano Soares, 2091 - Vila Nova',
      destaque: true,
    },
    {
      nome: 'Clínica Veterinária Santa Clara',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica veterinária tradicional, atendendo Três Lagoas desde 1988. Mais de 35 anos de experiência no cuidado com animais.',
      logo: '/images/logo.png',
      telefone: '(67) 3521-2219',
      cidade: 'Três Lagoas-MS',
      bairro: 'Jardim Brasília',
      endereco: 'Av. Ranulpho Marques Leal, 874 - Jardim Brasília',
      destaque: false,
    },
    {
      nome: 'Pet 3 Shower House',
      tipo: 'HOTEL_PET',
      descricao: 'Hotel pet completo com consultório veterinário 24h, banho e tosa, emergência 24h e pet sitter. Atendimento completo para seu pet.',
      logo: '/images/logo.png',
      telefone: '(67) 99894-5500',
      whatsapp: '(67) 99674-8657',
      email: 'pet3house@gmail.com',
      instagram: '@pet3showerhouse',
      cidade: 'Três Lagoas-MS',
      bairro: 'Centro',
      endereco: 'Rua Dr. Oscár Guimarães, 1780 - Centro',
      horarioFunc: '24 horas',
      destaque: true,
    },
    {
      nome: 'Cantinho do Pet - Hotel e Creche',
      tipo: 'HOTEL_PET',
      descricao: 'Hotel e creche para cães e gatos. Ambiente amplo e seguro, com área verde para seu pet brincar. Hospedagem diária ou por período.',
      logo: '/images/logo.png',
      telefone: '(67) 99234-5678',
      whatsapp: '(67) 99234-5678',
      cidade: 'Três Lagoas-MS',
      bairro: 'Jardim Alvorada',
      endereco: 'Rua das Flores, 500 - Jardim Alvorada',
      destaque: true,
    },

    // Três Lagoas-MS - Pet Shops
    {
      nome: 'Mundo Pet - Casa de Rações e Acessórios',
      tipo: 'PETSHOP',
      descricao: 'Pet shop completo com rações premium, acessórios, medicamentos e petiscos para cães e gatos.',
      logo: '/images/logo.png',
      telefone: '(67) 3521-8700',
      whatsapp: '(67) 98453-2260',
      email: 'roniesbtl@hotmail.com',
      cidade: 'Três Lagoas-MS',
      bairro: 'Centro',
      endereco: 'Rua Elmano Soares, 2053 - Centro',
      destaque: true,
    },
    {
      nome: 'Pet Shop Claranã',
      tipo: 'PETSHOP',
      descricao: 'Pet shop com rações Special Dog, Magnus, Zuppy, Bomguy, Chanin e Premier. Acessórios, medicamentos, vacinas e animais vivos (calopsitas, periquitos, hamsters, porquinhos da índia, coelhos).',
      logo: '/images/logo.png',
      telefone: '(67) 2104-5085',
      whatsapp: '(67) 98164-2515',
      email: 'sildemberg_tst@hotmail.com',
      cidade: 'Três Lagoas-MS',
      bairro: 'Paranapunga',
      endereco: 'Rua Antônio Estevan Leal, 1710 - Paranapunga',
      destaque: false,
    },
    {
      nome: 'Clinicão Pet Shop Banho e Tosa',
      tipo: 'PETSHOP',
      descricao: 'Pet shop com serviços de banho, tosa e clínica veterinária integrados.',
      logo: '/images/logo.png',
      telefone: '(67) 3521-2888',
      cidade: 'Três Lagoas-MS',
      bairro: 'Jardim Nova Ipanema',
      endereco: 'Rua Manoel Rodrigues Artez, 1081 - Jardim Nova Ipanema',
      destaque: false,
    },
    {
      nome: 'Aninha Banho E Tosa',
      tipo: 'PETSHOP',
      descricao: 'Especializada em banho e tosa desde 2017. Atendimento carinhoso para seu pet.',
      logo: '/images/logo.png',
      telefone: '(67) 99999-0000',
      cidade: 'Três Lagoas-MS',
      bairro: 'Centro',
      endereco: 'Av. Capitão Olinto Mancini, 993 - Centro',
      destaque: false,
    },
    {
      nome: 'Patatinhas Banho Tosa',
      tipo: 'PETSHOP',
      descricao: 'Serviços de banho e tosa com mais de 5 anos de experiência. Fundada em 2020.',
      logo: '/images/logo.png',
      telefone: '(67) 99999-0001',
      cidade: 'Três Lagoas-MS',
      bairro: 'Ipê',
      endereco: 'Rua Orlando Galo, 4307 - Ipê',
      destaque: false,
    },
    {
      nome: 'Cani & Gatti Banho E Tosa',
      tipo: 'PETSHOP',
      descricao: 'Banho e tosa especializado para cães e gatos desde 2017.',
      logo: '/images/logo.png',
      telefone: '(67) 99999-0002',
      cidade: 'Três Lagoas-MS',
      bairro: 'Nossa Senhora Aparecida',
      endereco: 'Rua João Dantas Filgueiras, 895 - Nossa Senhora Aparecida',
      destaque: false,
    },

    // Andradina-SP
    {
      nome: 'Andravet - Veterinária e Pet Shop',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica veterinária completa com pet shop. Medicamentos, vacinas, rações e acessórios.',
      logo: '/images/logo.png',
      telefone: '(18) 3722-3953',
      cidade: 'Andradina-SP',
      bairro: 'Centro',
      endereco: 'Rua Alexandre Salomão, 1160 - Centro',
      destaque: true,
    },
    {
      nome: 'Hospital Veterinário Mundo Animal',
      tipo: 'HOSPITAL_VETERINARIO',
      descricao: 'Hospital veterinário com atendimento especializado em Andradina.',
      logo: '/images/logo.png',
      telefone: '(18) 99750-5957',
      whatsapp: '(18) 99750-5957',
      cidade: 'Andradina-SP',
      bairro: 'Centro',
      endereco: 'Centro, Andradina-SP',
      destaque: false,
    },
    {
      nome: 'Hospital Veterinário de Andradina (FEA)',
      tipo: 'HOSPITAL_VETERINARIO',
      descricao: 'Hospital veterinário vinculado à Fundação Educacional de Andradina. Atendimento completo.',
      logo: '/images/logo.png',
      telefone: '(18) 3702-3702',
      email: 'hospital@fea.br',
      cidade: 'Andradina-SP',
      bairro: 'Parque São Gabriel',
      endereco: 'Rua Vereador Antonio Brito Vieira, S/N - Parque São Gabriel',
      destaque: false,
    },
    {
      nome: 'Clínica Veterinária Clinicão',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica veterinária no centro de Andradina.',
      logo: '/images/logo.png',
      telefone: '(18) 3722-1035',
      cidade: 'Andradina-SP',
      bairro: 'Centro',
      endereco: 'Rua Vereador Manoel Teixeira de Freitas, 1728 - Centro',
      destaque: false,
    },
    {
      nome: 'É o Bicho Pet Shop',
      tipo: 'PETSHOP',
      descricao: 'Pet shop com venda de filhotes e produtos para animais.',
      logo: '/images/logo.png',
      telefone: '(18) 3722-1918',
      cidade: 'Andradina-SP',
      bairro: 'Vila Passarelli',
      endereco: 'Rua Ceará, 406 - Vila Passarelli',
      destaque: false,
    },
    {
      nome: 'Spada - Casa de Rações e Acessórios',
      tipo: 'PETSHOP',
      descricao: 'Casa de rações e acessórios para pets.',
      logo: '/images/logo.png',
      telefone: '(18) 99751-8596',
      whatsapp: '(18) 99751-8596',
      cidade: 'Andradina-SP',
      bairro: 'Centro',
      endereco: 'Andradina-SP',
      destaque: false,
    },

    // Ilha Solteira-SP
    {
      nome: 'Clínica Veterinária Petvida',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica completa com consultórios, sala de vacina, internação, ultrassonografia, raio-x, fisioterapia, ozônioterapia, banho e tosa. Equipe: Dra. Caroline Gasche, Dra. Jéssica Lopes, Dr. Thiago Barreto e Dra. Vanessa Veronese.',
      logo: '/images/logo.png',
      telefone: '(18) 3743-4206',
      whatsapp: '(18) 99631-6401',
      cidade: 'Ilha Solteira-SP',
      bairro: 'Centro',
      endereco: 'Av. Brasil Sul, 1170',
      destaque: true,
    },
    {
      nome: 'Farmavet e Policlínica Veterinária',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Policlínica veterinária com farmácia especializada.',
      logo: '/images/logo.png',
      telefone: '(18) 3742-2564',
      cidade: 'Ilha Solteira-SP',
      bairro: 'Zona Norte',
      endereco: 'Av. Brasil Norte, 1155 - Zona Norte',
      destaque: false,
    },
    {
      nome: 'Veterinária Clinicão & Gato',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica veterinária com mais de 16 anos de experiência.',
      logo: '/images/logo.png',
      telefone: '(18) 3743-5260',
      cidade: 'Ilha Solteira-SP',
      bairro: 'Zona Norte',
      endereco: 'Alameda Tucurui, 141 - Zona Norte',
      destaque: false,
    },

    // Castilho-SP
    {
      nome: 'Casa Castilho',
      tipo: 'PETSHOP',
      descricao: 'Pet shop com animais vivos, artigos e alimentos para pets. Em funcionamento desde 2019.',
      logo: '/images/logo.png',
      telefone: '(19) 98216-5460',
      whatsapp: '(19) 98216-5460',
      cidade: 'Castilho-SP',
      bairro: 'Centro',
      endereco: 'Rua Osorio Junqueira, 481 - Centro',
      destaque: false,
    },
    {
      nome: 'Agro Canuto Pet',
      tipo: 'PETSHOP',
      descricao: 'Pet shop com animais de estimação, cães, gatos, pássaros e peixes ornamentais.',
      logo: '/images/logo.png',
      telefone: '(18) 99999-0003',
      cidade: 'Castilho-SP',
      bairro: 'Centro',
      endereco: 'Rua Jose Manoel de Angelo, 599 - Centro',
      destaque: false,
    },

    // Brasilândia-MS
    {
      nome: 'Clinvet',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica veterinária com serviços de higiene e embelezamento de animais desde 2018.',
      logo: '/images/logo.png',
      telefone: '(67) 99999-0004',
      cidade: 'Brasilândia-MS',
      bairro: 'Centro',
      endereco: 'Rua Idolo Guastaldi, 638 - Centro',
      destaque: false,
    },
    {
      nome: 'Banho E Tosa Beleza Pura',
      tipo: 'PETSHOP',
      descricao: 'Especializado em banho e tosa desde 2012.',
      logo: '/images/logo.png',
      telefone: '(67) 99999-0005',
      cidade: 'Brasilândia-MS',
      bairro: 'Centro',
      endereco: 'Av. São José, 837 - Sala B - Centro',
      destaque: false,
    },

    // Selvíria-MS
    {
      nome: 'Agropecuária Central Boi Gordo - Espaço Pet',
      tipo: 'PETSHOP',
      descricao: 'Agropecuária com espaço pet completo. Medicamentos, rações, produtos de higiene, coleiras, brinquedos, casinhas, colchões e roupas para pets.',
      logo: '/images/logo.png',
      telefone: '(67) 99186-7596',
      whatsapp: '(67) 99186-7596',
      cidade: 'Selvíria-MS',
      bairro: 'Centro',
      endereco: 'Rua Adelmo Zambon, 821 - Centro',
      destaque: false,
    },

    // Mirandópolis-SP
    {
      nome: 'Agromarcos Clínica Veterinária Pet Shop',
      tipo: 'CLINICA_VETERINARIA',
      descricao: 'Clínica veterinária com pet shop completo.',
      logo: '/images/logo.png',
      telefone: '(18) 3701-2866',
      whatsapp: '(18) 99143-5243',
      email: 'nilton.veterinario@hotmail.com',
      cidade: 'Mirandópolis-SP',
      bairro: 'Centro',
      endereco: 'Rua Armando Sales de Oliveira, 136 - Centro',
      horarioFunc: 'Seg-Sex 08:00-18:00, Sáb 08:00-12:00',
      destaque: false,
    },
  ]

  for (const empresa of empresas) {
    await prisma.empresa.create({
      data: {
        ...empresa,
        slug: generateSlug(empresa.nome),
        fotos: '[]',
      },
    })
  }

  console.log(`${empresas.length} empresas criadas!`)

  // ==================== PRESTADORES ====================
  // Prestadores serão cadastrados manualmente pelo admin
  // Não há prestadores fictícios no seed

  console.log('0 prestadores criados (cadastre manualmente pelo admin)')

  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
