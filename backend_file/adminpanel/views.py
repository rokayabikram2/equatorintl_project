from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .models import GlobalSettings, ContactUS, Navigation,Apply
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.db.models import Q 


from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import GlobalSettings , Navigation
from .serializers import GlobalSettingsSerializer ,NavigationSerializer

from django.views.generic import View
import os 

class ReactAppView(View):

    def get(self, request):
        try:

            with open(os.path.join(settings.REACT_APP, 'dist', 'index.html')) as file:
                return HttpResponse(file.read())

        except :
            return HttpResponse(
                """
                index.html not found ! build your React app !!
                """,
                status=501,
            )







def admin_login(request):
    glob = GlobalSettings.objects.all()
    try:
        # messages.info(request, 'Account not found')
        if request.method == 'POST':
            username = request.POST.get("username")
            password = request.POST.get("password")         
            user_obj = User.objects.filter(username = username)
            
            if not user_obj.exists():
                messages.info(request, "Account not found")
                return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
            print(username, password)
            user_obj = authenticate(username = username, password = password)

            if user_obj and user_obj.is_superuser:
                login(request, user_obj)
                return redirect("dashboard")
          
            messages.info(request, "Invalid password")
            return redirect('/')
                    
        return render(request, "login.html", {'glob':glob})
       
    except Exception as e:
        print(e)
        # Add a proper response in case of an exception
        return HttpResponse("An error occurred")

@login_required(login_url=settings.LOGIN_URL)
def dashboard(request):
    glob = GlobalSettings.objects.all()

    return render(request, "dashboard.html", {'glob':glob})

def Logoutpage(request):
    logout(request)
    return redirect("admin_login")

@login_required(login_url=settings.LOGIN_URL)
def globalsetting(request):
    glob = GlobalSettings.objects.all()
    try:
        data = GlobalSettings.objects.first()
    except GlobalSettings.DoesNotExist:
        data = None

    if request.method == "POST":
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        address = request.POST.get('address')
        email = request.POST.get('email')
        description = request.POST.get('description')
        licence = request.POST.get('licence')
        register_no = request.POST.get('register_no')
        twitterlink = request.POST.get('twitterlink')
        facebooklink = request.POST.get('facebooklink')
        linkdinlink = request.POST.get('linkdinlink')
        instagram = request.POST.get('instagram')
        youtubelink = request.POST.get('youtubelink')
        logo = request.FILES.get('logo')
        back_image = request.FILES.get('back_image')
        brochure = request.FILES.get('brochure')
        broc_name = request.POST.get('broc_name')

        if data is None:
            # Create a new GlobalSettings object
            data = GlobalSettings(SiteName=name, SiteContact=contact, SiteAddress=address, SiteEmail=email,
                                  Sitedescription=description,Sitelicence=licence,Sitetwitterlink=twitterlink,
                                  Sitefacebooklink=facebooklink,Sitelinkdinlink=linkdinlink,Siteinstagram=instagram,
                                  Siteyoutubelink=youtubelink, SiteRegister=register_no,broc_name=broc_name,)
        else:
            # Update existing GlobalSettings object
            data.SiteName = name
            data.SiteContact = contact
            data.SiteAddress = address
            data.SiteEmail = email
            data.Sitedescription = description
            data.Sitelicence = licence
            data.Sitetwitterlink = twitterlink
            data.Sitefacebooklink = facebooklink
            data.Sitelinkdinlink = linkdinlink
            data.Siteinstagram = instagram
            data.Siteyoutubelink = youtubelink
            data.SiteRegister = register_no
            data.broc_name = broc_name

        if logo:
            # Set the uploaded image to the 'logo' field
            data.logo = logo
        if brochure:
            # Set the uploaded image to the 'logo' field
            data.brochure = brochure
        if back_image:
            data.back_image = back_image
        
        data.save()

        return redirect('globalsetting')  # Redirect to the same view after saving the data

    return render(request, "globalsetting.html", {"data": data, 'glob' : glob})

@login_required(login_url=settings.LOGIN_URL)
def contactus(request):
    glob = GlobalSettings.objects.all()
    con=ContactUS.objects.all()
    query = request.GET.get('q')
    results = None
    
    if query:
        results = ContactUS.objects.filter(name__icontains=query)
 
    return render(request, "contactus.html",{'con':con, 'glob' : glob,'results':results})

@login_required(login_url=settings.LOGIN_URL)
def delete_contact(request, pk):
    con = get_object_or_404(ContactUS, pk=pk)

    if request.method == "POST":
        con.delete()
        return redirect('contactus')

    return redirect('contactus')

@login_required(login_url=settings.LOGIN_URL)
def main_navigation(request, parent_id=None):
    glob=GlobalSettings.objects.all()
    query = request.GET.get('q')
    results = None
    
    if query:
        results = Navigation.objects.filter(name__icontains=query)
        
    if parent_id:
        obj = Navigation.objects.filter(Parent=parent_id).order_by('position')
    else:
        obj = Navigation.objects.filter(Parent = None).order_by('position')
 
    return render(request, "main_navigation.html", {'obj':obj, 'parent_id':parent_id,'glob':glob,'results':results})

@login_required(login_url=settings.LOGIN_URL)
def navigation_list(request, parent_id=None):
    glob = GlobalSettings.objects.all()
    obj = Navigation.objects.all()

    if request.method == "POST":
        # Retrieve form data
        # next = request.POST.get('next','/')
        name = request.POST.get('name')
        caption = request.POST.get('caption')
        status = request.POST.get('status')
        position = request.POST.get('position')
        page_type = request.POST.get('page_type')
        title = request.POST.get('title')
        short_desc = request.POST.get('short_desc')
        bannerimage = request.FILES.get('bannerimage')
        brochure = request.FILES.get('brochure')
        meta_title = request.POST.get('meta_title')
        meta_keyword = request.POST.get('meta_keyword')
        icon_image = request.FILES.get('icon_image')
        slider_image = request.FILES.get('slider_image')
        parent_id = request.POST.get('Parent')
        desc = request.POST.get('desc')
        back_image = request.FILES.get('back_image')
        published_date= request.POST.get('published_date')
        interview_date = request.POST.get('interview_date')
        country = request.POST.get('country')
        
        
        if parent_id:
            parent_navigation = Navigation.objects.get(pk=parent_id)
        else:
            parent_navigation = None

        # Create a new Navigation objectj
        obj = Navigation.objects.create(
            name=name,
            caption=caption,
            status=status,
            position=position,
            page_type=page_type,
            title=title,
            short_desc=short_desc,
            meta_title=meta_title,
            meta_keyword=meta_keyword,
            desc=desc,
            Parent=parent_navigation, 
            published_date=published_date,
            interview_date=interview_date, # Assign parent navigation object
            country = country
        )
        

        # Set uploaded images
        if bannerimage:
            obj.bannerimage = bannerimage
        if slider_image:
            obj.slider_image = slider_image
        if back_image:
            obj.back_image = back_image
        if brochure:
            obj.brochure = brochure
        if icon_image:
            obj.icon_image = icon_image

        obj.save()  # Save the new Navigation object to the database

        obj = Navigation.objects.all()  # Update the navigation list with the new object

        if parent_id:
            return redirect('main_navigation', parent_id=parent_id )
        else:
            return redirect('main_navigation')
      

    return render(request, 'navigation.html',{'obj': obj, 'glob' : glob, 'parent_id':parent_id})

@login_required(login_url=settings.LOGIN_URL)
def update(request, pk):
    glob = GlobalSettings.objects.all()
    data = get_object_or_404(Navigation, pk=pk)

    if request.method == "POST":
        name=request.POST.get('name')
        caption=request.POST.get('caption')
        status=request.POST.get('status')
        position=request.POST.get('position')
        page_type=request.POST.get('page_type')
        title=request.POST.get('title')
        short_desc=request.POST.get('short_desc')
        desc=request.POST.get('desc')
        bannerimage=request.FILES.get('bannerimage')
        meta_title=request.POST.get('meta_title')
        meta_keyword=request.POST.get('meta_keyword')
        icon_image=request.FILES.get('icon_image')
        slider_image=request.FILES.get('slider_image')
        brochure = request.FILES.get('brochure')
        parent_id = request.POST.get('Parent')
        back_image = request.FILES.get('back_image')
        published_date = request.POST.get('published_date')
        interview_date =request.POST.get('interview_date')
        country = request.POST.get('country')
        

        if parent_id:
            parent_navigation = Navigation.objects.get(pk=parent_id)
        else:
            parent_navigation = None

        
        # Update the object with the form data
        data.name = name
        data.caption = caption
        data.status = status
        data.position = position
        data.page_type = page_type
        data.title = title
        data.short_desc = short_desc
        data.meta_title = meta_title
        data.meta_keyword = meta_keyword
        data.desc = desc
        data.Parent=parent_navigation
        data.published_date=published_date
        data.interview_date=interview_date
        data.country = country
        
        

        if bannerimage:
            data.bannerimage = bannerimage

        if slider_image:
            data.slider_image = slider_image
            
        
        if back_image:
            data.back_image = back_image
        
        if brochure:
            data.brochure = brochure
            
        if icon_image:
            data.icon_image = icon_image
        
        data.save()

        if parent_id:
            return redirect('main_navigation', parent_id=parent_id )
        else:
            return redirect('main_navigation')
        
    parent_id = data.Parent.id if data.Parent else None

    return render(request, 'update.html', {'data': data,'glob':glob,'parent_id':parent_id})

@login_required(login_url=settings.LOGIN_URL)
def delete_nav(request, pk):
    obj = get_object_or_404(Navigation, pk=pk)
    parent_id = None

    if request.method == "POST":
        parent_id = obj.Parent.id if obj.Parent else None
        obj.delete()

    if parent_id:
        return redirect('main_navigation', parent_id=parent_id)
    else:
        return redirect('main_navigation')
    
    

@login_required(login_url=settings.LOGIN_URL)
def apply(request):
    glob = GlobalSettings.objects.all()
    appl= Apply.objects.all()
 
    return render(request, "apply_now.html",{'appl':appl, 'glob' : glob})

@login_required(login_url=settings.LOGIN_URL)
def delete_apply(request):
    if request.method == "POST":
        # Check if "selected_items" is in the POST data
        selected_items = request.POST.getlist('selected_items')
        
        if selected_items:
            # Loop through the selected items and delete them
            for item_pk in selected_items:
                appl = get_object_or_404(Apply, pk=item_pk)
                appl.delete()

    return redirect('apply')


@login_required(login_url=settings.LOGIN_URL)
def application(request,pk):
    glob = GlobalSettings.objects.all()
    # app= Apply.objects.all()
    app = get_object_or_404(Apply, pk=pk)
    
    return render (request,'applications.html',{'glob':glob,'app':app})


# from django.http import HttpResponse
# from django.template.loader import get_template
# from xhtml2pdf import pisa  # Import the pisa module from xhtml2pdf

# def generate_pdf(request, pk):
#     # Get the application object from the database using the `application_id`
#     app = Apply.objects.get(pk=pk)

#     # Load the HTML template
#     template = get_template('applications.html')  # Replace with your actual template name

#     # Render the template with the application data
#     html = template.render({'app': app})

#     # Create a PDF response
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = f'attachment; filename="application_{app.name}.pdf"'

#     # Create a PDF document from the HTML content
#     pisa_status = pisa.CreatePDF(html, dest=response)

#     # If the PDF generation was successful, return the response
#     if pisa_status.err:
#         return HttpResponse('We had some errors <pre>' + html + '</pre>')
#     return response

# from django.http import HttpResponse
# from django.template.loader import get_template
# from xhtml2pdf import pisa

# def download_as_pdf(request, pk):
#     # Get the application object from the database using the `pk`
#     app = Apply.objects.get(pk=pk)

#     # Load the HTML template
#     template = get_template('applications.html')  # Replace with your actual template name

#     # Render the template with the application data
#     html = template.render({'app': app})

#     # Create a PDF response
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = f'attachment; filename="section_{app.name}.pdf"'

#     # Find the content within the specified section using BeautifulSoup
#     from bs4 import BeautifulSoup
#     soup = BeautifulSoup(html, 'html.parser')
#     section_content = soup.find('section', {'id': 'downloadable-content'})

#     # Create a new HTML document with only the section content
#     new_html = str(section_content)

#     # Create a PDF document from the HTML content
#     pisa_status = pisa.CreatePDF(new_html, dest=response)

#     # If the PDF generation was successful, return the response
#     if pisa_status.err:
#         return HttpResponse('We had some errors <pre>' + new_html + '</pre>')
#     return response


# this

# from django.http import HttpResponse
# from django.template.loader import get_template
# from xhtml2pdf import pisa
# from bs4 import BeautifulSoup

# def download_as_pdf(request, pk):
#     # Get the application object from the database using the `pk`
#     app = Apply.objects.get(pk=pk)

#     # Load the HTML template
#     template = get_template('applications.html')  # Replace with your actual template name

#     # Render the template with the application data
#     context = {'app': app}
#     html = template.render(context)

#     # Create a PDF response
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = f'attachment; filename="section_{app.name}.pdf"'

#     # Find the content within the specified section using BeautifulSoup
#     soup = BeautifulSoup(html, 'html.parser')
#     section_content = soup.find('section', {'id': 'downloadable-content'})

#     # Create a new HTML document with only the section content
#     new_html = str(section_content)

#     # Define CSS styles as a string
#     css_styles = """
#     <style>
   

#     /* Add this CSS to style your template */

#     /* Navbar */
#     .navbar {
#         background-color: #fff; /* Change the background color as needed */
#         box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Add a shadow effect */
#     }
    
#     .navbar h6 {
#         font-size: 1.2rem;
#         font-weight: bold;
#         margin: 0;
#     }
    
#     /* Card Header */
#     .card-header {
#         background: linear-gradient(45deg, #007BFF, #00A2FF); /* Gradient background */
#     }
    
#     .card-header h6 {
#         color: #fff;
#         text-transform: capitalize;
#     }
    
#     /* Form Container */
#     .form-container {
#         background-color: #fff;
#         box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
#         padding: 20px;
#     }
    
#     /* Labels */
#     label {
#         font-weight: bold;
#         font-size: 18px;

#     }
    
#     /* Displayed Text */
#     p {
#         margin: 0;
#     }
    
#     /* Buttons */
#     .btn-primary {
#         background-color: #007BFF;
#         color: #fff;
#         border: none;
#         padding: 10px 20px;
#         border-radius: 5px;
#         text-decoration: none;
#         font-weight: bold;
#         cursor: pointer;
#         transition: background-color 0.3s ease;
#     }
    
#     .btn-primary:hover {
#         background-color: #0056b3; /* Darker shade on hover */
#     }
    
#     /* Images */
#     img {
#         max-width: 100%;
#         height: auto;
#         border-radius: 5px;
#     }
    
#     /* Links */
#     a {
#         color: #007BFF;
#         text-decoration: none;
#         font-weight: bold;
#         transition: color 0.3s ease;
#     }
    
#     a:hover {
#         color: #0056b3; /* Darker shade on hover */
#     }
    
#     /* Responsive Design */
#     @media (max-width: 768px) {
#         .form-container {
#             padding: 10px;
#         }
#     }
    
#     /* Style the <p> tag */
#         p {
#             margin: 0;
#             font-size: 1rem; /* Adjust the font size as needed */
#             line-height: 1.4; /* Adjust the line height as needed */
#             color: #333; /* Text color */
#             /* Add any other styles you desire for beautification */
#             padding: 5px; /* Add some padding for spacing */
#             border: 1px solid #ccc; /* Add a border */
#             border-radius: 5px; /* Add rounded corners */
#             background-color: #f5f5f5; /* Add a background color */
#             box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
#             transition: background-color 0.3s ease, transform 0.3s ease;
#         }
        
#         /* Style the <p> tag on hover */
#         p:hover {
#             background-color: #e0e0e0; /* Change the background color on hover */
#             transform: scale(1.02); /* Add a slight scale effect on hover */
#         }
        

        

#     </style>
#     """

#     # Append the CSS styles to the HTML
#     new_html = css_styles + new_html

#     # Create a PDF document from the HTML content
#     pisa_status = pisa.CreatePDF(new_html, dest=response)
    

#     # If the PDF generation was successful, return the response
#     if pisa_status.err:
#         return HttpResponse('We had some errors <pre>' + new_html + '</pre>')
#     return response

# def search_results(request):
#     query = request.GET.get('q')
#     if query:
#         results = Apply.objects.filter(
#             Q(name__icontains=query) |
#             Q(email__icontains=query) 
#         )
#     else:
#         results = Apply.objects.all()

#     return render(request, 'apply_now.html', {'results': results})


from django.shortcuts import render
from .models import Apply


def search_results(request):
    glob=GlobalSettings.objects.all()
    
    query = request.GET.get('q')
    results = None

    if query:
        results = Apply.objects.filter(name__icontains=query)
        
    
    return render(request, 'search.html', {'results': results, 'query': query,'glob':glob})

