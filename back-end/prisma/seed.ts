import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@innovista.com';
  const plainPassword = 'Admin@123';
  
  console.log('--- Database Seeding Started ---');

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { Admin_Email: adminEmail },
  });

  if (!existingAdmin) {
    console.log(`Creating default admin: ${adminEmail}`);
    
    // Hash the password (using 10 salt rounds)
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await prisma.admin.create({
      data: {
        Admin_Name: 'System Admin',
        Admin_Email: adminEmail,
        Admin_Phone: '0000000000',
        Admin_Password: hashedPassword,
      },
    });
    
    console.log('Admin account created successfully.');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${plainPassword}`);
  } else {
    console.log('Admin account already exists. Skipping...');
  }

  console.log('--- Database Seeding Completed ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
