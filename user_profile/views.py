from django.shortcuts import render, HttpResponse ,redirect
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth.models import User
from django.contrib.auth import login , logout , authenticate
from django.contrib import messages
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required

from django.http import HttpResponseNotFound
from django.shortcuts import render, HttpResponse, get_object_or_404
from home.models import Car, Location


from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import re

from django.views.decorators.cache import cache_control

# Create your views here.

def Login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('UserLog')  # Redirect to some logged-in page
        else:
            messages.error(request, 'Invalid username or password.')  # Use error message
            return redirect('login')  # Redirect back to login page
    else:
        return render(request, 'pages/Login.html')  # Render the login page template


@cache_control(no_cache=False, must_revalidate=False, no_store=False)
@login_required(login_url='login')
def UserInfo(request):
    return render(request, 'user/UserInformation.html')


@cache_control(no_cache=False, must_revalidate=False, no_store=False)
@login_required(login_url='login')
def UserLog(request):
    return render(request, 'user/user.html')


def Signup(request):
    if request.method == 'GET':
        return render(request, 'pages/Signup.html', {"form": UserCreationForm()})
    else:
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        # Username validation
        if User.objects.filter(username=username).exists():
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Username already taken'})
        if len(username) < 4:
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Username must be at least 4 characters long'})
        if not re.match(r'^[a-zA-Z0-9_]+$', username):
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Username can only contain letters, numbers, and underscores'})

        # Check password match
        if password1 != password2:
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Passwords do not match'})

        # Password validation
        if len(password1) < 8:
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Password must be at least 8 characters long'})
        if not re.search(r"[A-Z]", password1):
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Password must contain at least one uppercase letter'})
        if not re.search(r"[a-z]", password1):
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Password must contain at least one lowercase letter'})
        if not re.search(r"[0-9]", password1):
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Password must contain at least one digit'})
        if not re.search(r"[\W_]", password1):
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'Password must contain at least one special character'})

        try:
            user = User.objects.create_user(username, password=password1)
            user.save()
            login(request, user)
            return redirect('UserLog')
        except IntegrityError:
            return render(request, 'pages/Signup.html', {'form': UserCreationForm(), 'error': 'An error occurred during signup. Please try again.'})

        
def Logout(request):
    logout(request)
    return redirect('login')

def user_searching(request):
    query = request.GET.get('search')
    destination = request.GET.get('destination')
    start_date = request.GET.get('start_date')
    start_datetime = request.GET.get('start_datetime')
    end_date = request.GET.get('end_date')
    end_datetime = request.GET.get('end_datetime')

    results = Car.objects.all()
    if query:
        results = results.filter(locations__city__icontains=query)

    return render(request, 'user\search.html', {'results': results, 'query': query, 'destination': destination})

    # return HttpResponse('this is search page')
            