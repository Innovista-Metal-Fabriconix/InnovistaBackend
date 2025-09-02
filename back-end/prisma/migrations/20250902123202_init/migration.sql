-- CreateTable
CREATE TABLE "public"."Customer" (
    "CustomerId" SERIAL NOT NULL,
    "Cus_Name" TEXT NOT NULL,
    "Cus_Email" TEXT NOT NULL,
    "Cus_PhoneNumber" TEXT NOT NULL,
    "Cus_CompanyName" TEXT,
    "Cus_Logo" TEXT,
    "Verify_State" BOOLEAN NOT NULL DEFAULT false,
    "Purchase_Goods" TEXT,
    "Cus_Password" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerId")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "AdminId" SERIAL NOT NULL,
    "Admin_Name" TEXT NOT NULL,
    "Admin_Email" TEXT NOT NULL,
    "Admin_Phone" TEXT NOT NULL,
    "Admin_Profile" TEXT,
    "Admin_Password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminId")
);

-- CreateTable
CREATE TABLE "public"."Feed_Back" (
    "Feed_backId" SERIAL NOT NULL,
    "Feed_back_comment" TEXT NOT NULL,
    "Feed_Back_Images" TEXT[],
    "Rating" INTEGER NOT NULL,
    "CustomerId" INTEGER NOT NULL,
    "DesignID" INTEGER NOT NULL,

    CONSTRAINT "Feed_Back_pkey" PRIMARY KEY ("Feed_backId")
);

-- CreateTable
CREATE TABLE "public"."Notifications" (
    "NotificationsID" SERIAL NOT NULL,
    "Date_Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "SenderEmail" TEXT NOT NULL,
    "Recevied_Emails" TEXT[],
    "View_List" TEXT[],
    "Notifications_Body" TEXT NOT NULL,
    "Notifications_Title" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("NotificationsID")
);

-- CreateTable
CREATE TABLE "public"."Design" (
    "DesignID" SERIAL NOT NULL,
    "Design_Name" TEXT NOT NULL,
    "Design_Image" TEXT[],
    "Design_Description" TEXT NOT NULL,
    "Categories" TEXT[],
    "Design_Colors" TEXT[],
    "Design_BlogPosts" TEXT[],
    "Design_Sizes" TEXT[],
    "Design_CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "AdminId" INTEGER NOT NULL,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("DesignID")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "OrderID" SERIAL NOT NULL,
    "CustomerId" INTEGER NOT NULL,
    "Order_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Order_Status" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "public"."OrderDesign" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "designId" INTEGER NOT NULL,

    CONSTRAINT "OrderDesign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Cus_Email_key" ON "public"."Customer"("Cus_Email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_Admin_Email_key" ON "public"."Admin"("Admin_Email");

-- AddForeignKey
ALTER TABLE "public"."Feed_Back" ADD CONSTRAINT "Feed_Back_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "public"."Customer"("CustomerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feed_Back" ADD CONSTRAINT "Feed_Back_DesignID_fkey" FOREIGN KEY ("DesignID") REFERENCES "public"."Design"("DesignID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Design" ADD CONSTRAINT "Design_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "public"."Admin"("AdminId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "public"."Customer"("CustomerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderDesign" ADD CONSTRAINT "OrderDesign_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderDesign" ADD CONSTRAINT "OrderDesign_designId_fkey" FOREIGN KEY ("designId") REFERENCES "public"."Design"("DesignID") ON DELETE RESTRICT ON UPDATE CASCADE;
