from django.db import models
# from django.utils import timezone

class GlobalSettings(models.Model):
    SiteName = models.CharField(max_length=100)
    SiteContact = models.CharField(max_length=100)
    SiteEmail = models.EmailField()
    SiteAddress = models.CharField(max_length=500)
    Sitedescription = models.CharField(max_length=500)
    Sitelicence = models.CharField(max_length=300)
    SiteRegister = models.CharField(max_length=100,null=True)
    Sitetwitterlink = models.CharField(max_length=300)
    Sitefacebooklink = models.CharField(max_length=300)
    Sitelinkdinlink = models.CharField(max_length=300)
    Siteinstagram = models.CharField(max_length=300)
    Siteyoutubelink = models.CharField(max_length=300)
    logo = models.ImageField(upload_to="Global/",max_length=200, null=True, default=None)
    back_image = models.ImageField(upload_to="Global/",null=True)
    brochure = models.FileField(upload_to="brochure/",null=True)
    broc_name =models.CharField(max_length=100,null=True)

    def __str__(self):
        return self.SiteName

class ContactUS(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    message = models.TextField()
    mobile = models.CharField(max_length=50,null=True)


    def __str__(self):
        return self.name
      

class Navigation(models.Model):
    PAGE_TYPE = (
        ('Home','Home'), ('Home/Slider','Home/Slider'),
        ('Home/Aboutus','Home/Aboutus'),('legaldocument','legaldocument'),('legaldocument/slider','legaldocument/slider'),('Organization chart','Organization chart'),('Current Demand','Current Demand'),
        ('Current Demand/slider','Current Demand/slider'),('Newspaper Vacancy','Newspaper Vacancy'),('NewspaperVacancy/Slider','NewspaperVacancy/Slider'),('Apply/Slider','Apply/Slider'),
        ('M&V/Slider','M&V/Slider'),('Mission & Vision','Mission & Vision'),('Testimonial','Testimonial'),('Clients','Clients'),
        ('AboutUs','AboutUs'),('About Nepal','About Nepal'),('About Nepal/Image','About Nepal/Image'),('Message from MD','Message from MD'),('Recruitment Process','Recruitment Process'),
        ('Why Choose Us/right','Why Choose Us/right'),('Why Choose Us/left','Why Choose Us/left'),('WhyChooseUs/slider','WhyChooseUs/slider'),('Job Sector','Job Sector'),('Job Sector/slider','Job Sector/slider'),('Documentation','Documentation'),
        ('Documentation/Country','Documentation/Country'),('Gallery','Gallery'),('Gallery/slider','Gallery/slider'),('Gallery/Company profile','Gallery/Company profile'),('Gallery/Events','Gallery/Events'),
        ('Contact us','contact us')
     
       
       
    )

    STATUS = (
        ('Publish', 'Publish'),
        ('Draft', 'Draft')
    )
    name = models.CharField(max_length=100, null=False)
    caption = models.CharField(max_length=100)
    status = models.CharField(choices=STATUS, max_length=50)
    position = models.IntegerField()
    page_type = models.CharField(choices=PAGE_TYPE, null=True, blank=True, max_length=50)
    title = models.CharField(max_length=200)
    short_desc = models.TextField(null=True)
    desc = models.TextField(null=True)
    bannerimage = models.ImageField(upload_to="banner/",null=True)
    meta_title = models.CharField(max_length=100, null=True)
    meta_keyword = models.CharField(max_length=100, null=True)
    icon_image = models.ImageField(upload_to="icon/", null=True)
    slider_image = models.ImageField(upload_to="slider/", null=True)
    Parent = models.ForeignKey('self', related_name="childs", on_delete=models.CASCADE, null=True, blank=True)
    brochure = models.FileField(upload_to="brochure/",null=True)
    back_image = models.ImageField(upload_to="background/",null=True)
    published_date=models.CharField(max_length=50,null=True)
    interview_date = models.CharField(max_length=50,null =True)
    country = models.CharField(max_length=50,null =True)
    

    def __str__(self):
        return self.name
    
    
    
class Apply(models.Model):
    name = models.CharField(max_length=50)
    mobile = models.CharField(max_length=50,null=True)
    permanentAddress = models.CharField(max_length=500,null=True)
    currentAddress = models.CharField(max_length=50,null=True)
    email = models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=50,default="Nepal")
    message = models.TextField(null=True)
    cv = models.FileField(upload_to='cv_uploads/',null=True)
    photo = models.FileField(upload_to='pp_photo',null=True)
    passport = models.FileField(upload_to='passport',null=True)
    certificate=models.FileField(upload_to='academic_certificate',null=True)

    def _str_(self):
        return self.name


