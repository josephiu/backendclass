














  --Quesiton number 1: inserting a record into the account table

-- data for table 'account'
INSERT INTO public.account(
	account_firstname, account_lastname, account_email, account_password)
	VALUES ('Tony', 'Stark','tony@starkent.com','Iam1ronM@n');


  --Quesiton number 2: changing the account type of Tony Stark record

UPDATE public.account
	SET account_type='Admin'
	WHERE account_id = 1;

  --Quesiton number 3: changing the account type of Tony Stark record

DELETE FROM public.account
	WHERE account_lastname = 'Stark';

  --Quesiton number 4: Modifying the inventory description 
 --REPLACING A TEXT INSIDE A inv_desription column using REPLACE key word
UPDATE public.inventory
	SET inv_description= REPLACE(inv_description, 'small interiors', 'a huge interior')
	WHERE inv_id = 10;

   
  --Quesiton number 5: inner Join 
   
    SELECT
    inv_make,
    inv_model,
    classification_name
FROM
    inventory
INNER JOIN classification
    ON inv_model = classification_name;


--Quesiton number 6: updating two solumns at once using REPLACE keyword
UPDATE public.inventory
	SET inv_image= REPLACE(inv_image,'/images','/images/vehicles'), inv_thumbnail=REPLACE(inv_image,'/images','/images/vehicles');