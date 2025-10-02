// prisma/seed-simple.js - ARCHIVO DE EMERGENCIA
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeder simple...')
  
  // Solo crear 1 tenant y 1 usuario para probar
  const tenant = await prisma.tenant.create({
    data: { name: 'Empresa Test' }
  })
  
  await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: 'Usuario Test',
      password: 'test123',
      telephone: '3000000000',
      role: 'USER',
      tenantId: tenant.id
    }
  })
  
  console.log('✅ Datos de prueba creados!')
}

main()
  .finally(() => prisma.$disconnect())