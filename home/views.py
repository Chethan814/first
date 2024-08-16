from django.http import HttpResponseNotFound
from django.shortcuts import render, HttpResponse, get_object_or_404
from .models import Car, Location

# Create your views here.


def index(request):
    return render(request, 'pages/index.html')


def searching(request):
    query = request.GET.get('search')
    destination = request.GET.get('destination')
    start_date = request.GET.get('start_date')
    start_datetime = request.GET.get('start_datetime')
    end_date = request.GET.get('end_date')
    end_datetime = request.GET.get('end_datetime')

    results = Car.objects.all()
    if query:
        results = results.filter(locations__city__icontains=query)

    return render(request, 'pages/search.html', {'results': results, 'query': query, 'destination': destination})

    # return HttpResponse('this is search page')


def car_detail(request, car_id):
    car = get_object_or_404(Car, pk=car_id)
    return render(request, 'pages/car.html', {'car': car})


def car_detail_by_make(request, make):
    try:
        car = Car.objects.get(make=make)
        return render(request, 'pages/car.html', {'car': car})
    except Car.DoesNotExist:
        return HttpResponseNotFound("Car with make '{}' does not exist.".format(make))
