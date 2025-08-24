-- CreateTable
CREATE TABLE "public"."Customer" (
    "CustomerId" SERIAL NOT NULL,
    "Cus_Name" TEXT NOT NULL,
    "Cus_Email" TEXT NOT NULL,
    "Cus_PhoneNumber" TEXT NOT NULL,
    "Cus_CompanyName" TEXT,
    "Cus_Logo" TEXT NOT NULL,
    "Verify_State" BOOLEAN NOT NULL,
    "Purchase_Goods" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerId")
);
